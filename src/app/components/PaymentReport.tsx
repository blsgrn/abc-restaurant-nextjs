import React, { useEffect, useState } from "react";

const PaymentReport = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/payments`)
      .then((response) => response.json())
      .then((data) => setReportData(data))
      .catch((error) => console.error("Error fetching payment report:", error));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Payment Report</h2>
      {reportData.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Period</th>
              <th className="py-2">Total Amount</th>
              <th className="py-2">Payment Count</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((report, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{report.period}</td>
                <td className="py-2">${report.totalAmount.toFixed(2)}</td>
                <td className="py-2">{report.paymentCount}</td>
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

export default PaymentReport;
