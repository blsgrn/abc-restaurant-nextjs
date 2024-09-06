import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyWeeklySalesChart = () => {
  const [WeeklyReservation, setWeeklyReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlySales = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reservations`
        );
        if (!response.ok) throw new Error("Error fetching reservations");
        const reservations = await response.json();

        // Prepare sales data for the last 28 days grouped by week
        const reservationData = calculateMonthlyWeeklyReservation(reservations);
        setWeeklyReservation(reservationData);
      } catch (error) {
        console.error("Error fetching sales:", error);
        setError("Failed to load sales data");
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlySales();
  }, []);

  // Calculate total sales for each week over the last month (4 weeks)
  const calculateMonthlyWeeklyReservation = (reservations) => {
    const today = new Date();
    const lastFourWeeks = new Array(4).fill(0).map((_, i) => {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - i * 7 - 6); // Start of the week (Monday)
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() - i * 7); // End of the week (Sunday)
      return { startOfWeek, endOfWeek, totalSales: 0 };
    });

    // Sum up total sales for each week
    reservations.forEach((reservation) => {
      const reservationDate = new Date(reservation.date);
      lastFourWeeks.forEach((week) => {
        if (
          reservationDate >= week.startOfWeek &&
          reservationDate <= week.endOfWeek
        ) {
          const totalAmount =
            reservation.type === "Dining"
              ? reservation.diningPrice
              : reservation.deliveryPrice;
          week.totalSales += totalAmount;
        }
      });
    });

    return lastFourWeeks.reverse(); // reverse to show oldest week first
  };

  // Chart data
  const data = {
    labels: WeeklyReservation.map(
      (week) =>
        `${week.startOfWeek.toLocaleDateString()} - ${week.endOfWeek.toLocaleDateString()}`
    ),
    datasets: [
      {
        label: "Total Reservations",
        data: WeeklyReservation.map((week) => week.totalSales),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Reservatons Trend for the Last Month",
      },
    },
  };

  if (loading) return <p>Loading sales data...</p>;
  if (error) return <p>{error}</p>;

  return <Line data={data} options={options} />;
};

export default MonthlyWeeklySalesChart;
