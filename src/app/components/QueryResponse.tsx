import React, { useEffect, useState } from "react";

const QueryResponse = () => {
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserQueries = async () => {
      try {
        const userId = localStorage.getItem("id");

        if (!userId) {
          setError("User ID not found. Please log in again.");
          return;
        }

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
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Queries</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Query</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Response</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query) => (
            <tr key={query.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">
                {new Date(query.date).toLocaleString()}
              </td>
              <td className="border px-4 py-2">{query.query}</td>
              <td className="border px-4 py-2">{query.status}</td>
              <td className="border px-4 py-2">{query.response}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryResponse;
