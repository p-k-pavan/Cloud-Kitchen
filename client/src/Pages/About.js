import React from 'react';
import { FaLeaf, FaClock, FaStar, FaUtensils, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-[#f9f5f0]">
      <div className="relative bg-[#6a452e] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Cloud Kitchen</h1>
          <p className="text-xl md:text-2xl">Delicious meals crafted with passion and delivered with care</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-[#7f5539] mb-6">Our Story</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 mb-4">
                    Cloud Kitchen was born from a simple idea: to bring restaurant-quality meals to your doorstep without compromising on freshness or flavor. Founded in 2023, we've grown from a small team of passionate chefs to a full-fledged culinary operation.
                  </p>
                  <p className="text-gray-700">
                    Our journey began in a humble kitchen with just three recipes. Today, we proudly serve hundreds of delicious meals daily, each prepared with the same love and attention to detail that started it all.
                  </p>
                </div>
                <div className="bg-[#ede0d4] rounded-lg p-6 flex items-center justify-center">
                  <FaUtensils className="text-6xl text-[#7f5539]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#7f5539] mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="p-6">
                <div className="bg-[#ede0d4] w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <FaStar className="text-2xl text-[#7f5539]" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Quality</h3>
                <p className="text-gray-700 text-center">
                  We source only the freshest ingredients and prepare each meal with meticulous attention to detail.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="p-6">
                <div className="bg-[#ede0d4] w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <FaLeaf className="text-2xl text-[#7f5539]" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Freshness</h3>
                <p className="text-gray-700 text-center">
                  All our meals are prepared daily using seasonal produce to ensure maximum freshness and nutrition.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="p-6">
                <div className="bg-[#ede0d4] w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <FaClock className="text-2xl text-[#7f5539]" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Convenience</h3>
                <p className="text-gray-700 text-center">
                  Enjoy delicious, healthy meals without the hassle of cooking or cleaning up afterwards.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-[#7f5539] mb-6">Our Team</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#ede0d4] rounded-lg p-6 flex items-center justify-center">
                  <FaUtensils className="text-6xl text-[#7f5539]" />
                </div>
                <div>
                  <p className="text-gray-700 mb-4">
                    Our team of expert chefs brings together decades of culinary experience from around the world. Each member shares a passion for creating delicious, innovative dishes that delight our customers.
                  </p>
                  <p className="text-gray-700">
                    From classic comfort foods to exciting new flavors, our chefs work tirelessly to craft menus that cater to all tastes and dietary needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <h2 className="text-3xl font-bold text-[#7f5539] mb-8 text-center">Get In Touch</h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#ede0d4] w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <FaPhone className="text-xl text-[#7f5539]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                  <p className="text-gray-700">+91 123-456-7890</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#ede0d4] w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <FaEnvelope className="text-xl text-[#7f5539]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                  <p className="text-gray-700">info@cloudkitchen.com</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#ede0d4] w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <FaMapMarkerAlt className="text-xl text-[#7f5539]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                  <p className="text-gray-700">123 Food Street, Culinary City</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-[#7f5539] text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center mb-6">
            <FaUtensils className="text-2xl mr-2" />
            <span className="text-xl font-bold">Cloud Kitchen</span>
          </div>
          <p className="mb-4">Fresh meals delivered daily to your doorstep</p>
          <p>© {new Date().getFullYear()} Cloud Kitchen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;