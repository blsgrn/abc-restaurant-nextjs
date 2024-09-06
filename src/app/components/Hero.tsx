"use client";

import { useState } from "react";
import Image from "next/image";
import LoginForm from "./LoginForm";

const Hero = () => {
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
        <LoginForm />
      </div>
    </section>
  );
};

export default Hero;
