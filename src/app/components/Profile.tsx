"use client";

import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("id");
      if (!userId) {
        setError("No user ID found in local storage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
        } else {
          const errorMessage = await response.text();
          setError(errorMessage || "Failed to fetch user details.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("An error occurred while fetching user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!userDetails) {
    return <p>No user details available.</p>;
  }

  return (
    <div className="mx-auto bg-gradient-to-br from-blue-50 via-white to-blue-100 p-10 rounded-3xl shadow-2xl w-full max-w-3xl m-12 relative">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
        User Profile
      </h1>

      <div className="space-y-6 text-lg">
        <div className="flex justify-between items-center bg-white bg-opacity-90 p-4 rounded-xl shadow-md">
          <strong className="text-blue-700">Name:</strong>
          <span className="font-medium text-gray-700">{userDetails.name}</span>
        </div>

        <div className="flex justify-between items-center bg-white bg-opacity-90 p-4 rounded-xl shadow-md">
          <strong className="text-blue-700">Username:</strong>
          <span className="font-medium text-gray-700">
            {userDetails.username}
          </span>
        </div>

        <div className="flex justify-between items-center bg-white bg-opacity-90 p-4 rounded-xl shadow-md">
          <strong className="text-blue-700">Email:</strong>
          <span className="font-medium text-gray-700">{userDetails.email}</span>
        </div>

        <div className="flex justify-between items-center bg-white bg-opacity-90 p-4 rounded-xl shadow-md">
          <strong className="text-blue-700">Contact Number:</strong>
          <span className="font-medium text-gray-700">
            {userDetails.contactNumber}
          </span>
        </div>

        <div className="flex justify-between items-center bg-white bg-opacity-90 p-4 rounded-xl shadow-md">
          <strong className="text-blue-700">Role:</strong>
          <span className="font-medium text-gray-700">{userDetails.role}</span>
        </div>

        <div className="flex justify-between items-center bg-white bg-opacity-90 p-4 rounded-xl shadow-md">
          <strong className="text-blue-700">Subscribed:</strong>
          <span className="font-medium text-gray-700">
            {userDetails.subscribe ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-10 bg-gradient-to-r from-blue-400 to-teal-400 rounded-3xl transform scale-105 blur-2xl"></div>
    </div>
  );
};

export default UserProfile;
