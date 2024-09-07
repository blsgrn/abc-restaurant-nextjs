import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const QueryAnalysisReport = () => {
  const [queryStats, setQueryStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/queries/analysis`
        );
        if (!response.ok) throw new Error("Error fetching query analysis data");
        const data = await response.json();
        setQueryStats(data);
        console.log("Fetched data:", data); // Log the fetched data
      } catch (error) {
        console.error("Error fetching query analysis data:", error);
        setError("Error fetching query analysis data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading report...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!queryStats) return <div>No data available</div>;

  // Prepare data for Pie chart
  const statusLabels = queryStats.statusBreakdown.map((status) => status.label);
  const statusValues = queryStats.statusBreakdown.map((status) => status.value);

  const pieData = {
    labels: statusLabels,
    datasets: [
      {
        data: statusValues,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Query Analysis Report
      </h1>

      {/* Statistics Summary */}
      <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {queryStats.totalQueries}
          </h2>
          <p className="text-gray-600">Total Queries</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {queryStats.averageResponseTime.toFixed(2)} mins
          </h2>
          <p className="text-gray-600">Avg Response Time</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {queryStats.pendingQueries}
          </h2>
          <p className="text-gray-600">Pending Queries</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {queryStats.resolvedQueries}
          </h2>
          <p className="text-gray-600">Resolved Queries</p>
        </div>
      </div>

      {/* Query Status Breakdown - Pie Chart Example */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Query Status Breakdown
      </h2>
      <div className="mb-8 mx-auto w-1/2">
        <Pie data={pieData} />
      </div>

      {/* Query List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Queries
        </h2>
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Query</th>
              <th className="px-4 py-3">Submitted Date</th>
              <th className="px-4 py-3">Response Time</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {queryStats.recentQueries.map((query) => (
              <tr key={query.id} className="hover:bg-gray-100">
                <td className="px-4 py-3 text-sm text-gray-600">
                  {query.userId} {/* Adjust to userName if available */}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {query.query}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(query.date).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {query.responseDate
                    ? `${Math.round(
                        (new Date(query.responseDate) - new Date(query.date)) /
                          60000
                      )} mins`
                    : "Pending"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {query.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueryAnalysisReport;
