import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

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

      const labels = data.map((item) => item._id);
      const amounts = data.map((item) => item.totalAmount);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Total Payments per Day",
            data: amounts,
            borderColor: "rgba(0, 102, 102, 1)",
            backgroundColor: "rgba(0, 102, 102, 0.2)",
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
