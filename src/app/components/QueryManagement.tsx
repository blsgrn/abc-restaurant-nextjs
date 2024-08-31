import { useEffect, useState } from "react";

const QueryManagement = () => {
  const [queries, setQueries] = useState([]);
  const [responses, setResponses] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all queries
    const fetchQueries = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/queries`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched queries:", data);

          // Fetch user details for each query
          const queriesWithUserNames = await Promise.all(
            data.map(async (query) => {
              try {
                const userResponse = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/users/${query.userId}`
                );

                if (!userResponse.ok) {
                  console.error(`User not found for userId: ${query.userId}`);
                  return { ...query, userName: "Unknown User" };
                }

                const userData = await userResponse.json();
                return { ...query, userName: userData.name };
              } catch (userError) {
                console.error("Error fetching user data:", userError);
                return { ...query, userName: "Unknown" };
              }
            })
          );

          setQueries(queriesWithUserNames);
        } else {
          setError("Failed to fetch queries.");
        }
      } catch (error) {
        console.error("Error during fetchQueries execution:", error);
        setError("An error occurred while fetching queries.");
      }
    };

    fetchQueries();
  }, []);

  // Handle response input change
  const handleResponseChange = (queryId, value) => {
    setResponses({ ...responses, [queryId]: value });
  };

  // Handle submit response
  const handleResponseSubmit = async (queryId) => {
    try {
      // Find the query being updated
      const queryToUpdate = queries.find((query) => query.id === queryId);

      // Ensure the full query object is being sent in the PUT request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/queries/${queryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...queryToUpdate, // Include all original fields
            response: responses[queryId], // Update response
            status: "Closed", // Update status
          }),
        }
      );

      if (response.ok) {
        alert("Response submitted successfully!");
        setQueries((prevQueries) =>
          prevQueries.map((query) =>
            query.id === queryId
              ? { ...query, response: responses[queryId], status: "Closed" }
              : query
          )
        );
      } else {
        alert("Failed to submit response.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the response.");
    }
  };

  return (
    <div>
      <h2>Query Management</h2>
      {error && <p className="error">{error}</p>}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Query</th>
            <th>Status</th>
            <th>Response</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query) => (
            <tr key={query.id}>
              <td>{new Date(query.date).toLocaleString()}</td>
              <td>{query.userName}</td>
              <td>{query.query}</td>
              <td>{query.status}</td>
              <td>
                {responses[query.id] !== undefined || query.response ? (
                  <textarea
                    value={responses[query.id] ?? query.response}
                    onChange={(e) =>
                      handleResponseChange(query.id, e.target.value)
                    }
                    placeholder="Type your response here..."
                  ></textarea>
                ) : (
                  <button onClick={() => handleResponseChange(query.id, "")}>
                    Respond
                  </button>
                )}
              </td>
              <td>
                <button
                  onClick={() => handleResponseSubmit(query.id)}
                  disabled={responses[query.id] === ""}
                >
                  Submit Response
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryManagement;
