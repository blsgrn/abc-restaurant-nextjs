"use client";

import React, { useEffect, useState } from "react";

const ManageAccounts = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    username: "",
    role: "",
    email: "",
    contactNumber: "",
    subscribe: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          const errorMessage = await response.text();
          setError(errorMessage || "Failed to fetch users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("An error occurred while fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditFormData({
      name: user.name,
      username: user.username,
      role: user.role,
      email: user.email,
      contactNumber: user.contactNumber,
      subscribe: user.subscribe,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData({
      ...setEditFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveClick = async () => {
    try {
      const existingUserResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${editingUserId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!existingUserResponse.ok) {
        const errorMessage = await existingUserResponse.text();
        setError(errorMessage || "Failed to fetch the existing user.");
        return;
      }

      const existingUserData = await existingUserResponse.json();

      const updatedUserData = {
        ...existingUserData,
        ...editFormData,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${editingUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        }
      );

      if (response.ok) {
        setUsers(
          users.map((user) =>
            user.id === editingUserId ? { ...user, ...updatedUserData } : user
          )
        );
        setEditingUserId(null);
        alert("User updated successfully.");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("An error occurred while updating the user.");
    }
  };

  const handleDeleteClick = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
        alert("User deleted successfully.");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl m-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage Accounts</h1>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact Number</th>
            <th className="px-4 py-2">Subscribed</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            editingUserId === user.id ? (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className="input input-bordered w-full"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    name="username"
                    value={editFormData.username}
                    onChange={handleEditChange}
                    className="input input-bordered w-full"
                  />
                </td>
                <td className="px-4 py-2">
                  <select
                    name="role"
                    value={editFormData.role}
                    onChange={handleEditChange}
                    className="input input-bordered w-full"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Staff">Staff</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                    className="input input-bordered w-full"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    name="contactNumber"
                    value={editFormData.contactNumber}
                    onChange={handleEditChange}
                    className="input input-bordered w-full"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    name="subscribe"
                    checked={editFormData.subscribe}
                    onChange={handleEditChange}
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={handleSaveClick}
                    className="text-green-500 hover:underline mr-4"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingUserId(null)}
                    className="text-red-500 hover:underline"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.contactNumber}</td>
                <td className="px-4 py-2">{user.subscribe ? "Yes" : "No"}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAccounts;
