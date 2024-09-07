import { useEffect, useState } from "react";

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

  // Filter by daily, weekly, and monthly
  const dailyReservations = filterDaily(reservations);
  const weeklyReservations = filterWeekly(reservations);
  const monthlyReservations = filterMonthly(reservations);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Reservation Report
      </h1>

      <section>
        <h2 className="text-xl text-green-700 font-semibold mb-4">
          Reservations made today
        </h2>
        <ReportTable reservations={dailyReservations} />
      </section>

      <section>
        <h2 className="text-xl  text-green-700 font-semibold mb-4">
          Reservations made this week
        </h2>
        <ReportTable reservations={weeklyReservations} />
      </section>

      <section>
        <h2 className="text-xl  text-green-700 font-semibold mb-4">
          Reservations made this month
        </h2>
        <ReportTable reservations={monthlyReservations} />
      </section>
    </div>
  );
};

const ReportTable = ({ reservations }) => {
  if (reservations.length === 0) {
    return <p>No reservations found for this period.</p>;
  }

  return (
    <div className="p-6 bg-gray-50 ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Reservations
      </h2>
      <table className="min-w-full table-auto bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Reservation ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
              User
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Restaurant
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Time
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Guests
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="hover:bg-gray-100">
              <td className="px-4 py-3 text-sm text-gray-600">
                {reservation.id}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {reservation.userName}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {reservation.restaurantId}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {new Date(reservation.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {reservation.time}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {reservation.noOfGuests}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {reservation.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationReport;
