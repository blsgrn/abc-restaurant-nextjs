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
      <div
        className="container mx-auto p-6 min-h-screen "
        style={{
          backgroundImage: `url('/food-pics/offer_bg.jpg')`,
          backgroundSize: "cover", // This ensures the image covers the entire div
          backgroundPosition: "center", // Center the background image
          backgroundRepeat: "no-repeat", // Prevent repeating the background image
        }}
      >
        <h1 className="text-4xl font-bold text-center mb-12 text-neutral">
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
                key={offer.id}
                className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:transform hover:translate-y-[-5px]"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
              >
                <h2 className="text-xl font-semibold text-secondary mb-2">
                  {offer.title}
                </h2>
                <p className="text-gray-800 mb-4">{offer.description}</p>
                <p className="text-lg font-bold text-blue-600 mb-2">
                  {offer.discount}% Discount
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Start Date:</strong>{" "}
                  {new Date(offer.startDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
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
