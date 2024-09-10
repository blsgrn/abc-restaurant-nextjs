import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto"; // Import Chart.js

const PaymentLineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/daily`
      );
      const data = await response.json();
      console.log(data);

      // Update: Now accessing 'date' instead of '_id'
      const labels = data.map((item) => item._id);
      const amounts = data.map((item) => item.totalAmount);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Total Payments per Day",
            data: amounts,
            borderColor: "rgba(0, 102, 102, 1)", // Darker teal
            backgroundColor: "rgba(0, 102, 102, 0.2)", // Darker teal with transparency
            fill: true,
          },
        ],
      });
    };

    fetchData();
  }, []);

  return <Line data={chartData} />;
};

export default PaymentLineChart;
