"use client";
import React, { useState, useEffect } from "react";

const ManageOffers = () => {
  const [offers, setOffers] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch offers from API
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/offers`
        );
        if (response.ok) {
          const data = await response.json();
          setOffers(data);
        } else {
          throw new Error("Failed to fetch offers.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      }
    };

    fetchOffers();
  }, []);

  // Function to handle deleting an offer
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/offers/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setMessage("Offer deleted successfully.");
        setOffers(offers.filter((offer) => offer.id !== id));
      } else {
        throw new Error("Failed to delete the offer.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="container mx-auto ">
        <h1 className="text-3xl font-bold text-center mb-6">Offers List</h1>

        {message && <p className="text-center mb-4 text-red-500">{message}</p>}

        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Discount (%)</th>
              <th className="py-2 px-4">Start Date</th>
              <th className="py-2 px-4">End Date</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} className="border-t border-gray-200">
                <td className="py-2 px-4">{offer.title}</td>
                <td className="py-2 px-4">{offer.description}</td>
                <td className="py-2 px-4">{offer.discount}%</td>
                <td className="py-2 px-4">
                  {new Date(offer.startDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">
                  {new Date(offer.endDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDelete(offer.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageOffers;
