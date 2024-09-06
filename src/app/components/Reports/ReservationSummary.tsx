// components/ReservationSummary.js
import { useEffect, useState } from "react";

const ReservationSummary = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllReservations = async () => {
      try {
        // Fetch the reservations from the API using the correct endpoint
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
  }, []); // Runs once when the component mounts

  if (loading) {
    return <p>Loading reservations...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Reservation Summary Report
      </h1>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
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
    </div>
  );
};

export default ReservationSummary;
