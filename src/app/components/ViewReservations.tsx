"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const ViewReservations = () => {
  const router = useRouter();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reservations`
        );
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">All Reservations</h1>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Customer Name</th>
            <th className="border px-4 py-2">Time</th>
            <th className="border px-4 py-2">No. of Guests</th>
            <th className="border px-4 py-2">Special Requests</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{reservation.userName}</td>
              <td className="border px-4 py-2">{reservation.time}</td>
              <td className="border px-4 py-2">{reservation.noOfGuests}</td>
              <td className="border px-4 py-2">
                {reservation.specialRequests}
              </td>
              <td className="border px-4 py-2">{reservation.type}</td>
              <td className="border px-4 py-2">{reservation.status}</td>
              <td className="border px-4 py-2">
                <Link
                  href={`/update-reservation/${reservation.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ViewReservations;
