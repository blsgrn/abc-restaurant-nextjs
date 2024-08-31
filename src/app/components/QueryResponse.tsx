import React, { useEffect, useState } from "react";

const QueryResponse = () => {
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserQueries = async () => {
      try {
        // Get the userId from localStorage
        const userId = localStorage.getItem("id");

        if (!userId) {
          setError("User ID not found. Please log in again.");
          return;
        }

        // Fetch queries submitted by this user
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/queries?userId=${userId}`
        );

        if (response.ok) {
          const data = await response.json();
          setQueries(data);
        } else {
          setError("Failed to fetch queries.");
        }
      } catch (error) {
        console.error("Error fetching queries:", error);
        setError("An error occurred while fetching queries.");
      }
    };

    fetchUserQueries();
  }, []);

  return (
    <div>
      <h2>My Queries</h2>
      {error && <p className="error">{error}</p>}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Query</th>
            <th>Status</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query) => (
            <tr key={query.id}>
              <td>{new Date(query.date).toLocaleString()}</td>
              <td>{query.query}</td>
              <td>{query.status}</td>
              <td>{query.response}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryResponse;
