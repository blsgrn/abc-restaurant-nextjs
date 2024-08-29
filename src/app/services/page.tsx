"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ServicesPage = () => {
  const [services, setServices] = useState<
    {
      id: string;
      name: string;
      description: string;
      price: number;
      category: string;
      imageUrl: string;
    }[]
  >([]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/hospitalities`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched services:", data);
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  // Filter services based on search query
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 bg-gradient-to-br from-orange-200 to-yellow-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">Our Services</h1>
        {/* Search Field */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={() => {
              console.log("Search query:", searchQuery);
              // You can perform other actions here if needed
            }}
            className="bg-orange-500 text-white font-bold py-2 px-4 rounded-r-lg hover:bg-orange-600 transition duration-300"
          >
            Search
          </button>
        </div>
        <div className="grid grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-lg shadow-lg overflow-hidden bg-white"
            >
              <Image
                src={service.imageUrl || "/food-pics/default.jpg"}
                alt={service.name}
                width={400}
                height={300}
                className="object-cover w-full h-48"
                priority
              />
              <div className="p-4 h-full">
                <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                <p className="text-gray-700">{service.description}</p>
                <p className="mt-2 font-bold">${service.price.toFixed(2)}</p>
                <p className="text-sm text-accent font-semibold">
                  {service.category}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="/pdfs/nutritional-information.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300 m-2"
          >
            View Nutritional Information
          </a>
          <a
            href="/pdfs/full-menu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-300 m-2"
          >
            View Full Menu
          </a>
          <a
            href="/pdfs/kids-menu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 m-2"
          >
            View Kids Menu
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServicesPage;
