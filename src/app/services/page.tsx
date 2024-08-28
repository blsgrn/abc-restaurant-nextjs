"use client"; // Add this directive at the top

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar"; // Adjust the path based on your project structure

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

  // Fetch services data from the backend API
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

  return (
    <>
      <Navbar /> {/* Add the Navbar component here */}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-lg shadow-lg overflow-hidden bg-white"
            >
              <Image
                src={service.imageUrl || "/food-pics/default.jpg"} // Use the correct image URL
                alt={service.name}
                width={400}
                height={300}
                className="object-cover w-full h-48"
                priority
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                <p className="text-gray-600">{service.description}</p>
                <p className="mt-2 font-bold">${service.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{service.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
