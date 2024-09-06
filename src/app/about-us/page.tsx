import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="  p-6 min-h-screen bg-gradient-to-br from-orange-200 to-yellow-100 ">
        <div className="mx-auto bg-neutral bg-opacity-80 max-w-6xl  p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-primary mb-6">About Us</h1>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">
              Welcome to ABC Restaurant
            </h2>
            <p className="text-gray-600 bg-neutral-200 p-6 rounded-lg">
              At ABC Restaurant, we believe in delivering more than just a meal.
              We offer a culinary experience rooted in passion, fresh
              ingredients, and a touch of creativity. Whether you&apos;re dining
              with us in our cozy Kandy location or enjoying the urban ambiance
              of Colombo, our team is dedicated to ensuring every bite brings
              joy and satisfaction.
            </p>
          </section>

          {/* History & Founding */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600 bg-neutral-200 p-6 rounded-lg">
              Founded in 2010 by Chef S.B.S.GARAN, ABC Restaurant began with a
              simple mission: to create a space where traditional flavors meet
              modern techniques. Our journey started in Kandy, where our
              flagship restaurant quickly became a local favorite. In 2020, we
              expanded to Colombo, bringing our unique blend of cuisines to the
              heart of the city.
            </p>
          </section>

          {/* Locations */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">
              Our Locations
            </h2>
            {/* Flexbox container for side-by-side layout */}
            <div className="flex md:flex-row gap-6">
              {/* Kandy Location */}
              <div className="flex-1 bg-neutral-200 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Kandy
                </h3>
                <p className="text-gray-600  bg-neutral-200 p-6 rounded-lg">
                  Located in the heart of Sri Lanka&apos;s hill country, our
                  Kandy restaurant offers a serene and cozy dining experience,
                  perfect for both locals and tourists. With stunning views and
                  a welcoming atmosphere, Kandy is where it all began.
                </p>
                <p className="text-gray-600 mt-4">
                  <strong>Address:</strong> 123 Kandy Main Street, Kandy
                </p>
                <p className="text-gray-600">
                  <strong>Operating Hours:</strong> 10:00 AM - 10:00 PM
                  (Mon-Sun)
                </p>
              </div>

              {/* Colombo Location */}
              <div className="flex-1 bg-neutral-200 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Colombo
                </h3>
                <p className="text-gray-600  bg-neutral-200 p-6 rounded-lg">
                  Our Colombo location brings the vibrant energy of the city to
                  life with a modern interior, top-notch service, and a menu
                  that highlights the best of what ABC has to offer. Perfect for
                  a night out with friends or a special date night.
                </p>
                <p className="text-gray-600 mt-4">
                  <strong>Address:</strong> 456 Colombo High Road, Colombo
                </p>
                <p className="text-gray-600">
                  <strong>Operating Hours:</strong> 11:00 AM - 11:00 PM
                  (Mon-Sun)
                </p>
              </div>
            </div>
          </section>

          {/* Cuisine and Menu Philosophy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">
              Our Culinary Philosophy
            </h2>
            <p className="text-gray-600  bg-neutral-200 p-6 rounded-lg">
              We specialize in fusing traditional Sri Lankan flavors with modern
              international techniques. Our chefs are committed to sourcing the
              freshest ingredients, with a focus on sustainability and local
              produce. Whether it&apos;s our signature seafood dishes or
              vegetarian-friendly options, every plate is a work of art.
            </p>
          </section>

          {/* Core Values & Mission */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">
              Our Mission & Values
            </h2>
            <p className="text-gray-600  bg-neutral-200 p-6 rounded-lg">
              At ABC Restaurant, we value authenticity, creativity, and
              community. Our mission is simple: to offer an unforgettable dining
              experience that brings people together. From the moment you step
              into our restaurant to the last bite, we are committed to making
              every moment special.
            </p>
          </section>

          {/* Call to Action */}
          <section className="text-center mt-12">
            <h2 className="text-xl font-bold text-secondary mb-4">
              Ready to Experience ABC Restaurant?
            </h2>
            <p className="text-gray-600 mb-6  bg-neutral-200 p-6 rounded-lg">
              Whether you&apos;re visiting us in Kandy or Colombo, we invite you
              to savor the flavors and enjoy the hospitality that ABC Restaurant
              is known for. Book your table today or stop by for a memorable
              dining experience.
            </p>
            <div className="flex justify-center gap-4">
              {" "}
              {/* Added gap-4 for spacing */}
              <a
                href="/reservation"
                className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Book a Reservation
              </a>
              <a
                href="/gallery"
                className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                View Photo Gallery
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
