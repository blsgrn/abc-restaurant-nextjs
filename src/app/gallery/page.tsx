"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GalleryPage = () => {
  const [galleries, setGalleries] = useState([]);
  const [error, setError] = useState("");

  // Fetch all galleries
  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/galleries`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch galleries.");
      }
      const data = await response.json();
      setGalleries(data);
    } catch (error) {
      console.error("Error fetching galleries:", error);
      setError("Failed to load galleries.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Gallery</h1>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <div
              key={gallery._id}
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={`http://localhost:9090${gallery.imageUrl}`}
                alt={gallery.description}
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-800 font-semibold mb-2">
                  {gallery.description}
                </p>
                <p className="text-gray-600">
                  Restaurant: {gallery.restaurantId}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GalleryPage;
