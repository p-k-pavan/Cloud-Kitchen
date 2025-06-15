import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUtensils } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#7f5539] text-white pt-12 pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <FaUtensils className="text-3xl mr-2 text-yellow-400" />
              <span className="text-2xl font-bold">Cloud Kitchen</span>
            </div>
            <p className="mb-4 text-gray-300">
              Delivering delicious meals with love and care. Our cloud kitchen brings restaurant-quality food to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" className="text-gray-300 hover:text-yellow-400 transition">
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://www.twitter.com" className="text-gray-300 hover:text-yellow-400 transition">
                <FaTwitter className="text-xl" />
              </a>
              <a href="https://www.instagram.com" className="text-gray-300 hover:text-yellow-400 transition">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://www.linkedin.com" className="text-gray-300 hover:text-yellow-400 transition">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-yellow-400 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-yellow-400 transition">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-yellow-400 transition">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-yellow-400 transition">Gallery</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-yellow-400 transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-yellow-400 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-yellow-400" />
                <span className="text-gray-300">123 Food Street, Kitchen City, FC 12345</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-yellow-400" />
                <span className="text-gray-300">+91  123-456-7890</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-yellow-400" />
                <span className="text-gray-300">info@cloudkitchen.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-yellow-400 pb-2">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to get updates on new menu items and special offers.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-800"
                required
              />
              <button 
                type="submit" 
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-r-lg transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Cloud Kitchen. All rights reserved. | 
            <a href="/" className="hover:text-yellow-400 ml-2">Privacy Policy</a> | 
            <a href="/" className="hover:text-yellow-400 ml-2">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;