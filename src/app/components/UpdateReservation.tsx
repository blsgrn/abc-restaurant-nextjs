"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UpdateReservation = ({ id }) => {
  const router = useRouter();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reservations/${id}`
        );
        if (!response.ok) throw new Error("Error fetching reservation");
        const data = await response.json();
        setReservation(data);
      } catch (error) {
        console.error("Error fetching reservation:", error);
        setError("Error fetching reservation");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReservation();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation((prevReservation) => ({
      ...prevReservation,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reservations/${reservation.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...reservation,
            status: "Billing", // Set status to "Billing"
          }),
        }
      );
      if (!response.ok) throw new Error("Error updating reservation");
      alert("Reservation updated successfully!");
      router.back();
    } catch (error) {
      console.error("Error updating reservation:", error);
      setError("Error updating reservation");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center container mx-auto p-4 bg-gradient-to-br from-orange-200 to-yellow-100 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl m-12">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Update Reservation
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col w-full">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Time</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={reservation.time}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Number of Guests</span>
                </label>
                <input
                  type="number"
                  name="noOfGuests"
                  value={reservation.noOfGuests}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  min="1"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Special Requests</span>
                </label>
                <textarea
                  name="specialRequests"
                  value={reservation.specialRequests}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Type</span>
                </label>
                <select
                  name="type"
                  value={reservation.type}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="Dining">Dining</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Dining Price</span>
                </label>
                <input
                  type="number"
                  name="diningPrice"
                  value={reservation.diningPrice}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  min="0"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Delivery Price</span>
                </label>
                <input
                  type="number"
                  name="deliveryPrice"
                  value={reservation.deliveryPrice}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  min="0"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Special Request Charge</span>
                </label>
                <input
                  type="number"
                  name="specialRequestCharge"
                  value={reservation.specialRequestCharge}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  min="0"
                  required
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-accent w-full">
                Update Reservation
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateReservation;
