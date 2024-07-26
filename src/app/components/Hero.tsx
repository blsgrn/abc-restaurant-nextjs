"use client";

import { useState } from "react";
import Image from "next/image";

const Hero = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length < 1 || name.length < 1) {
      alert("Please provide the required information!");
    } else {
      alert("Thank you for registering!");

      setName("");
      setEmail("");
      setSubscribe(false);
    }
  };

  return (
    <section className="pt-12 px-6 container h-[860px] flex sm:flex-col justify-evenly bg-[url('https://images.pexels.com/photos/5041491/pexels-photo-5041491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover ">
      <div className="basis-1/2 px-16">
        <h1 className="text-6xl text-white px-16 pt-16 pb-4 font-bold">
          Lorem ipsum dolor sit amet <br />
          <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-orange-400">
            consectetur adipisicing
          </span>
        </h1>
        <p className="text-white text-lg px-16">
          elit. Est dicta a ullam facilis sequi distinctio rem suscipit
          asperiores vitae quae!
        </p>
      </div>
      <div className="basis-1/2 mx-auto flex ">
        <div className="border rounded-lg shadow-zinc-900 border-gray-400 h-4/6 w-3/5 mt-12 justify-center text-center items-center bg-white">
          <h2 className="font-bold text-2xl pt-8">Register Now</h2>
          <p className="text-gray-600 text-2xl pt-2">
            Take your life seriously!
          </p>
          <div className="flex flex-col gap-5 w-3/4 items-center mx-auto pt-6">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md p-3 mb-6"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md p-3 mb-6"
              />
              <div className="form-control mb-6">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={subscribe}
                    onChange={(e) => setSubscribe(e.target.checked)}
                  />
                  <span className="label-text ml-2">
                    Subscribe to our newsletter for promotions and updates
                  </span>
                </label>
              </div>
              <button type="submit" className="btn btn-secondary">
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
