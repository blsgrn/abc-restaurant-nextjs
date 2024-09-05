"use client";
import React, { useState, useEffect } from "react";

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState("");

  // Fetch all offers on component mount
  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offers`);
      if (!response.ok) {
        throw new Error("Failed to fetch offers.");
      }
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
      setError("Failed to load offers.");
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200">
        <h1 className="text-4xl font-bold text-center mb-6">
          Exclusive Offers
        </h1>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.length === 0 ? (
            <p className="text-center text-gray-600">
              No offers available at the moment.
            </p>
          ) : (
            offers.map((offer) => (
              <div
                key={offer._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-primary mb-2">
                  {offer.title}
                </h2>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <p className="text-lg font-bold text-blue-600 mb-2">
                  {offer.discount}% Discount
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Start Date:</strong>{" "}
                  {new Date(offer.startDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>End Date:</strong>{" "}
                  {new Date(offer.endDate).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default OffersPage;
