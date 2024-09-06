"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Customer", // Default role is set to "Customer"
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { username, password } = formData;

    if (!username || !password) {
      alert("Please fill out all required fields.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { token, role, name, id, email } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("name", name);
        localStorage.setItem("id", id);
        localStorage.setItem("email", email);

        // Redirect based on the user's role
        switch (role) {
          case "Customer":
            router.push("/customer");
            break;
          case "Staff":
            router.push("/staff");
            break;
          case "Admin":
            router.push("/admin");
            break;
          default:
            router.push("/");
            break;
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid login credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="card-body max-w-sm shrink-0 border rounded-lg shadow-2xl shadow-gray-300 border-gray-400 h-4/6 mt-12 justify-center text-center items-center bg-opacity-75 bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-3xl">
      <h1 className="text-2xl text-neutral-600 font-bold text-center p-2">
        Login Form
      </h1>
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            name="username"
            placeholder="eg: john123"
            value={formData.username}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Type your password"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-accent">
            Login
          </button>
        </div>
        <button
          type="button"
          className="btn btn-link text-gray-500"
          onClick={() => {
            window.location.href = "/sign-up";
          }}
        >
          Sign up
        </button>
      </form>
      {error && (
        <p className="text-red-500 text-sm text-center mt-4">{error}</p>
      )}
    </div>
  );
};

export default LoginForm;
