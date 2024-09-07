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
            status: "Closed", // Update status to "Closed"
            responseDate: new Date().toISOString(), // Set response date to current date
          }),
        }
      );

      if (response.ok) {
        alert("Response submitted successfully!");
        setQueries((prevQueries) =>
          prevQueries.map((query) =>
            query.id === queryId
              ? {
                  ...query,
                  response: responses[queryId],
                  status: "Closed",
                  responseDate: new Date().toISOString(),
                }
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Query Management
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="min-w-full table-auto bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Query
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Response
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Response Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {queries.map((query) => (
            <tr key={query.id} className="hover:bg-gray-100">
              <td className="px-4 py-3 text-sm text-gray-600">
                {new Date(query.date).toLocaleString()}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {query.userName}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{query.query}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {query.status}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {responses[query.id] !== undefined || query.response ? (
                  <textarea
                    className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={responses[query.id] ?? query.response}
                    onChange={(e) =>
                      handleResponseChange(query.id, e.target.value)
                    }
                    placeholder="Type your response here..."
                  />
                ) : (
                  <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => handleResponseChange(query.id, "")}
                  >
                    Respond
                  </button>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {query.responseDate
                  ? new Date(query.responseDate).toLocaleString()
                  : "Pending"}
              </td>
              <td className="px-4 py-3">
                <button
                  className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50"
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
