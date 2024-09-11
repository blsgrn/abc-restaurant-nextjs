"use client";
import React, { useState } from "react";
import ManageOffers from "./ManageOffers";

const OfferForm = () => {
  const [offer, setOffer] = useState({
    title: "",
    description: "",
    discount: "",
    startDate: "",
    endDate: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOffer({ ...offer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_API_URL}/offers`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(offer),
    };

    try {
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        setMessage("Offer created successfully!");
        setOffer({
          title: "",
          description: "",
          discount: "",
          startDate: "",
          endDate: "",
        });
      } else {
        throw new Error("Failed to create the offer.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create New Offer
        </h1>

        {message && (
          <p className="text-center mb-4 text-green-500">{message}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Offer Title</label>
            <input
              type="text"
              name="title"
              value={offer.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={offer.description}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={offer.discount}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={offer.startDate}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={offer.endDate}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Create Offer
          </button>
        </form>
      </div>
      <div>
        <ManageOffers />
      </div>
    </>
  );
};

export default OfferForm;
