import { useEffect, useState } from "react";

const ReservationSummary = () => {
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
    return <p>Loading reservations...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Reservation Summary Report
      </h1>
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

export default ReservationSummary;
