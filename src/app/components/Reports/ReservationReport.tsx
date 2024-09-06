// components/ReservationReport.js
import { useEffect, useState } from "react";
import MonthlyWeeklySalesChart from "./MonthlyWeeklyReservationChart";

// Helper functions to filter reservations based on the date range
const filterDaily = (reservations) => {
  const today = new Date();
  return reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.date);
    return (
      reservationDate.getDate() === today.getDate() &&
      reservationDate.getMonth() === today.getMonth() &&
      reservationDate.getFullYear() === today.getFullYear()
    );
  });
};

const filterWeekly = (reservations) => {
  const today = new Date();
  const oneWeekAgo = new Date(today.setDate(today.getDate() - 7));

  return reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.date);
    return reservationDate >= oneWeekAgo && reservationDate <= new Date();
  });
};

const filterMonthly = (reservations) => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  return reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.date);
    return reservationDate >= startOfMonth && reservationDate <= new Date();
  });
};

const ReservationReport = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllReservations = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reservations`
        );
        if (!response.ok) throw new Error("Error fetching reservations");

        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setError("Error fetching reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchAllReservations();
  }, []);

  if (loading) {
    return <p>Loading reservation reports...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Filter reservations by daily, weekly, and monthly
  const dailyReservations = filterDaily(reservations);
  const weeklyReservations = filterWeekly(reservations);
  const monthlyReservations = filterMonthly(reservations);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Reservation Report
      </h1>

      <section>
        <h2 className="text-xl font-semibold mb-4"> Reservations made today</h2>
        <ReportTable reservations={dailyReservations} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          Reservations made this week
        </h2>
        <ReportTable reservations={weeklyReservations} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          Reservations made this month
        </h2>
        <ReportTable reservations={monthlyReservations} />
      </section>
      <MonthlyWeeklySalesChart />
    </div>
  );
};

// Reusable table component to display reservations
const ReportTable = ({ reservations }) => {
  if (reservations.length === 0) {
    return <p>No reservations found for this period.</p>;
  }

  return (
    <table className="min-w-full table-auto border-collapse border border-gray-200 mb-6">
      <thead>
        <tr>
          <th className="border border-gray-200 px-4 py-2">Reservation ID</th>
          <th className="border border-gray-200 px-4 py-2">User</th>
          <th className="border border-gray-200 px-4 py-2">Restaurant</th>
          <th className="border border-gray-200 px-4 py-2">Date</th>
          <th className="border border-gray-200 px-4 py-2">Time</th>
          <th className="border border-gray-200 px-4 py-2">Guests</th>
          <th className="border border-gray-200 px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation.id}>
            <td className="border border-gray-200 px-4 py-2">
              {reservation.id}
            </td>
            <td className="border border-gray-200 px-4 py-2">
              {reservation.userName}
            </td>
            <td className="border border-gray-200 px-4 py-2">
              {reservation.restaurantId}
            </td>
            <td className="border border-gray-200 px-4 py-2">
              {new Date(reservation.date).toLocaleDateString()}
            </td>
            <td className="border border-gray-200 px-4 py-2">
              {reservation.time}
            </td>
            <td className="border border-gray-200 px-4 py-2">
              {reservation.noOfGuests}
            </td>
            <td className="border border-gray-200 px-4 py-2">
              {reservation.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReservationReport;
