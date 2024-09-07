import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto"; // Import Chart.js

const PaymentPieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/status`
      );
      const data = await response.json();
      console.log(data);

      const labels = data.map((item) => item._id); // Status values
      const counts = data.map((item) => item.count); // Counts

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Payment Status Breakdown",
            data: counts,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    };

    fetchData();
  }, []);

  return <Pie data={chartData} />;
};

export default PaymentPieChart;
