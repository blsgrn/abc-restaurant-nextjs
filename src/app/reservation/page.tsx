"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ReservationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    userEmail: "",
    restaurantId: "",
    serviceId: "",
    serviceCharge: 0,
    date: "",
    time: "",
    noOfGuests: 1,
    specialRequests: "",
    type: "Dining",
  });

  const [restaurants, setRestaurants] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/restaurants`
        );
        const data = await response.json();
        console.log(data);
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/hospitalities`
        );
        const data = await response.json();
        console.log(data);
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchRestaurants();
    fetchServices();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    const userName = localStorage.getItem("name");
    const userEmail = localStorage.getItem("email");
    if (userId) {
      setFormData((prevData) => ({ ...prevData, userId, userName, userEmail }));
    }
  }, []);

  useEffect(() => {
    if (formData.serviceId && formData.noOfGuests > 0) {
      const fetchServicePrice = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/hospitalities/${formData.serviceId}`
          );
          const service = await response.json();
          const servicePrice = service.price || 0;

          const newServiceCharge = servicePrice * formData.noOfGuests;
          setFormData((prevData) => ({
            ...prevData,
            serviceCharge: newServiceCharge,
          }));
        } catch (error) {
          console.error("Error fetching service price:", error);
        }
      };

      fetchServicePrice();
    }
  }, [formData.serviceId, formData.noOfGuests]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const { restaurantId, serviceId, date, time, noOfGuests } = formData;

    if (!restaurantId || !serviceId || !date || !time || !noOfGuests) {
      alert("Please fill out all required fields.");
      return false;
    }

    if (isNaN(noOfGuests) || noOfGuests < 1) {
      alert("Please enter a valid number of guests.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedInUser = localStorage.getItem("name");

    if (!loggedInUser) {
      alert("Please sign in to create a reservation.");
      return;
    }

    if (!validateForm()) return;

    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reservations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Reservation created successfully!");
        setFormData({
          restaurantId: "",
          serviceId: "",
          serviceCharge: 0,
          date: "",
          time: "",
          noOfGuests: 1,
          specialRequests: "",
          type: "Dining",
        });
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error during reservation creation:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center container mx-auto p-4 bg-gradient-to-br from-orange-200 to-yellow-100 min-h-screen">
        <div className="p-4 text-center">
          <h3>
            Whether you are planning a cozy night in or an elegant evening out,
            we have got you covered. Reserve a table at our restaurant for a
            delightful dining experience, or opt for our convenient delivery
            service to enjoy our delicious food at home. Don&apos;t wait—secure
            your spot or schedule your delivery today for an unforgettable
            culinary experience!
          </h3>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl m-12">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Create a Reservation
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col w-full md:w-1/2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Restaurant</span>
                  </label>
                  <select
                    name="restaurantId"
                    value={formData.restaurantId}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>
                      Select a restaurant
                    </option>
                    {restaurants.map((restaurant) => (
                      <option key={restaurant.id} value={restaurant.id}>
                        {restaurant.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Menu</span>
                  </label>
                  <select
                    name="serviceId"
                    value={formData.serviceId}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>
                      Select a menu
                    </option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Time</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
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
                    value={formData.noOfGuests}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Special Requests</span>
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Reservation Type</span>
              </label>
              <div className="flex gap-4">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="Dining"
                    checked={formData.type === "Dining"}
                    onChange={handleChange}
                    className="radio"
                    required
                  />
                  <span className="label-text ml-2">Dining</span>
                </label>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="Delivery"
                    checked={formData.type === "Delivery"}
                    onChange={handleChange}
                    className="radio"
                    required
                  />
                  <span className="label-text ml-2">Delivery</span>
                </label>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-accent w-full">
                Create Reservation
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReservationForm;
