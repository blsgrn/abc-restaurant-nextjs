"use client";

import React from "react";
import Navbar from "../components/Navbar";

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <>
      <Navbar className="min-h-screen" />;
      <div className="hero bg-base-200">
        <div className="hero-content lg:flex-col ">
          <div className="text-center lg:text-left">
            <p className="py-6">
              <div className="p-8 bg-gray-100 rounded-lg text-left text-primary-content">
                <h2 className="text-3xl font-bold text-center mb-4">
                  Unlock Exclusive Benefits!
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Exclusive Offers:</strong> Enjoy special discounts
                    and promotions available only to registered members.
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
                    <strong>Event Invitations:</strong> Be the first to know
                    about our upcoming events and secure your spot early.
                  </li>
                </ul>
                <p className="mt-6 text-left">
                  <strong>Join us today</strong> and let us take your dining
                  experience to the next level. We can&apos;t wait to serve you!
                </p>
              </div>
            </p>
          </div>
          <div>
            <h1 className="text-2xl text-neutral-600 font-bold text-center p-2">
              Login Form
            </h1>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
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
                    placeholder="password"
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
                      name="radio-10"
                      className="radio checked:bg-red-500"
                      defaultChecked
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Staff</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue-500"
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
                  <p>Sign up</p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
