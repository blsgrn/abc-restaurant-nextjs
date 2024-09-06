"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";

const GalleryPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <Gallery />
      </div>
      <Footer />
    </>
  );
};

export default GalleryPage;
