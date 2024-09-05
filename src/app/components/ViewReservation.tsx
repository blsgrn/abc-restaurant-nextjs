"use client";

import React, { useState, useEffect } from "react";

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the user's reservations based on user ID from localStorage
  useEffect(() => {
    const fetchUserReservations = async () => {
      const userId = localStorage.getItem("id"); // Assumes userId is stored in localStorage
      if (!userId) {
        setError("No user found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reservations/user/${userId}`
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

    fetchUserReservations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="container mx-auto p-6 ">
        <h1 className="text-3xl font-bold text-center mb-6">
          Your Reservations
        </h1>

        {reservations.length === 0 ? (
          <p className="text-center">No reservations found.</p>
        ) : (
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4">Reservation ID</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Time</th>
                <th className="py-2 px-4">Guests</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Special Requests</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id} className="border-t border-gray-200">
                  <td className="py-2 px-4">{reservation.id}</td>
                  <td className="py-2 px-4">
                    {new Date(reservation.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{reservation.time}</td>
                  <td className="py-2 px-4">{reservation.noOfGuests}</td>
                  <td className="py-2 px-4">{reservation.type}</td>
                  <td className="py-2 px-4">
                    {reservation.specialRequests || "None"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default UserReservations;
