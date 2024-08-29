"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const SignIn = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Customer",
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
        const { token, role, name } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("name", name);

        console.log(token);
        console.log(role);
        console.log(name);

        localStorage.setItem("token", token);
        localStorage.setItem("role", role); // Store the role in localStorage

        // Redirect based on the user's role
        switch (role) {
          case "customer":
            router.push("/customer");
            break;
          case "staff":
            router.push("/staff");
            break;
          case "admin":
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
    <>
      <Navbar className="min-h-screen" />
      <div className="hero bg-base-200">
        <div className="hero-content lg:flex-col">
          <div className="text-center lg:text-left">
            <div className="p-8 bg-gray-100 rounded-lg text-left text-primary-content">
              <h2 className="text-3xl font-bold text-center mb-4">
                Unlock Exclusive Benefits!
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Exclusive Offers:</strong> Enjoy special discounts and
                  promotions available only to registered members.
                </li>
                <li>
                  <strong>Personalized Experience:</strong> Save your favorite
                  dishes and get recommendations tailored just for you.
                </li>
                <li>
                  <strong>Faster Checkout:</strong> Breeze through your orders
                  with saved details and a streamlined checkout process.
                </li>
                <li>
                  <strong>Event Invitations:</strong> Be the first to know about
                  our upcoming events and secure your spot early.
                </li>
              </ul>
              <p className="mt-6 text-left">
                <strong>Join us today</strong> and let us take your dining
                experience to the next level. We can&apos;t wait to serve you!
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-2xl text-neutral-600 font-bold text-center p-2">
              Login Form
            </h1>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    name="username"
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
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Customer</span>
                    <input
                      type="radio"
                      name="role"
                      value="Customer"
                      className="radio checked:bg-red-500"
                      defaultChecked
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Staff</span>
                    <input
                      type="radio"
                      name="role"
                      value="Staff"
                      className="radio checked:bg-blue-500"
                      onChange={handleChange}
                    />
                  </label>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
