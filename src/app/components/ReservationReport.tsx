import React, { useEffect, useState } from "react";

const ReservationReport = ({ type }) => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/reports/reservations/${type}`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setReportData(data))
      .catch((error) =>
        console.error("Error fetching reservation report:", error)
      );
  }, [type]);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Reservation Report - {type.charAt(0).toUpperCase() + type.slice(1)}
      </h2>
      {reportData.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Period</th>
              <th className="py-2">Reservation Count</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((report, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{report.period}</td>
                <td className="py-2">{report.reservationCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default ReservationReport;
