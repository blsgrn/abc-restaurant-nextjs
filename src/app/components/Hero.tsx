"use client";

import { useState } from "react";
import Image from "next/image";

const Hero = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.length < 1 || name.length < 1) {
      alert("Please provide the required information!");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subscribe }),
      });

      if (response.ok) {
        alert("Thank you for registering!");
        setName("");
        setEmail("");
        setSubscribe(false);
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert(
          `Failed to register. Server responded with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "An error occurred while submitting the form. Please try again later."
      );
    }
  };

  return (
    <section className="pt-12 px-6 md:px-2 container h-[860px] flex xl:flex-col justify-evenly bg-[url('https://images.unsplash.com/photo-1599458252573-56ae36120de1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover ">
      <div className="basis-1/2 px-16 md:px-2 sm:px-0">
        <h1 className="text-6xl md:text-4xl text-white px-16 md:px-8 pt-16 md:pt-8 pb-4 font-bold">
          ABC Restaurant <br />
          <span className="text-6xl md:text-4xl  font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-orange-400">
            - where culinary excellence meets!
          </span>
        </h1>
        <p className="text-orange-100 text-lg px-16 md:px-8">
          Delight in our meticulously crafted dishes that showcase the freshest
          ingredients and the creativity of our passionate chefs. Join us for a
          memorable dining experience that tantalizes your taste buds and warms
          your heart.
        </p>
      </div>
      <div className="basis-1/2 mx-auto flex justify-center">
        <div className="border rounded-lg shadow-gray-300 border-gray-400 h-4/6 xl:h-fit w-3/5 xl:w-full mt-12 justify-center text-center items-center bg-white">
          <h2 className="font-bold text-2xl pt-8">Register Now</h2>

          <p className="text-gray-600 text-xl md:text-sm p-2">
            Receive latest offers and much more!
          </p>

          <div className="flex flex-col gap-5 w-3/4 items-center mx-auto pt-6">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-orange-200 rounded-md p-3 mb-6 w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-orange-200 rounded-md p-3 mb-6 w-full"
              />
              <div className="form-control mb-6">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={subscribe}
                    onChange={(e) => setSubscribe(e.target.checked)}
                  />
                  <span className="label-text ml-2 text-left">
                    Subscribe to our newsletter for promotions and updates
                  </span>
                </label>
              </div>
              <button type="submit" className="btn btn-secondary mb-6">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
