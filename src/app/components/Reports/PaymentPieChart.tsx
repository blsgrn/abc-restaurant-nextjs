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

      const labels = data.map((item) => item._id);
      const counts = data.map((item) => item.count);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Payment Status Breakdown",
            data: counts,
            backgroundColor: [
              "rgba(153, 0, 0, 0.8)",
              "rgba(0, 51, 102, 0.8)",
              "rgba(204, 153, 0, 0.8)",
              "rgba(0, 102, 102, 0.8)",
              "rgba(102, 0, 204, 0.8)",
              "rgba(204, 102, 0, 0.8)",
            ],
            borderColor: [
              "rgba(153, 0, 0, 1)",
              "rgba(0, 51, 102, 1)",
              "rgba(204, 153, 0, 1)",
              "rgba(0, 102, 102, 1)",
              "rgba(102, 0, 204, 1)",
              "rgba(204, 102, 0, 1)",
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
