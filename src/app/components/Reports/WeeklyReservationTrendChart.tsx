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
  Filler, // Import the Filler plugin
} from "chart.js";

// Register the components and the Filler plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WeeklyReservationTrendChart = () => {
  const [WeeklyReservation, setWeeklyReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeklyReservations = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reservations`
        );
        if (!response.ok) throw new Error("Error fetching reservations");
        const reservations = await response.json();

        // Prepare reservation data for the last 28 days grouped by week
        const reservationData = calculateWeeklyReservation(reservations);
        setWeeklyReservation(reservationData);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setError("Failed to load reservation data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyReservations();
  }, []);

  // Calculate total reservations for each week over the last month (4 weeks)
  const calculateWeeklyReservation = (reservations) => {
    const today = new Date();
    const lastFourWeeks = new Array(4).fill(0).map((_, i) => {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - i * 7 - 6); // Start of the week (Monday)
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() - i * 7); // End of the week (Sunday)
      return { startOfWeek, endOfWeek, totalReservations: 0 };
    });

    // Sum up total reservations for each week
    reservations.forEach((reservation) => {
      const reservationDate = new Date(reservation.date);
      lastFourWeeks.forEach((week) => {
        if (
          reservationDate >= week.startOfWeek &&
          reservationDate <= week.endOfWeek
        ) {
          week.totalReservations += 1; // Count each reservation
        }
      });
    });

    return lastFourWeeks.reverse(); // reverse to show oldest week first
  };

  // Chart data with darker colors
  const data = {
    labels: WeeklyReservation.map(
      (week) =>
        `${week.startOfWeek.toLocaleDateString()} - ${week.endOfWeek.toLocaleDateString()}`
    ),
    datasets: [
      {
        label: "Total Reservations",
        data: WeeklyReservation.map((week) => week.totalReservations),
        borderColor: "rgba(0, 123, 255, 1)", // Darker blue for the line
        backgroundColor: "rgba(0, 123, 255, 0.5)", // Darker blue with opacity for the fill
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#343a40", // Darker text for the legend
        },
      },
      title: {
        display: true,
        text: "Weekly Reservations Trend for the Last Month",
        color: "#343a40",
      },
      tooltip: {
        bodyColor: "#343a40",
        titleColor: "#343a40", // Darker title in tooltips
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#343a40", // Darker text for the X-axis labels
        },
      },
      y: {
        ticks: {
          color: "#343a40", // Darker text for the Y-axis labels
        },
      },
    },
  };

  if (loading) return <p>Loading reservation data...</p>;
  if (error) return <p>{error}</p>;

  return <Line data={data} options={options} />;
};

export default WeeklyReservationTrendChart;
