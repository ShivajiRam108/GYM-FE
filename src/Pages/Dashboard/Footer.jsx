// src/components/Dashboard/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* About */}
        <div>
          <h4 className="text-lg font-semibold mb-4">About Us</h4>
          <p className="text-sm text-gray-300 leading-6">
            Our Gym Management System helps manage memberships, track renewals, and optimize operations with a clean dashboard experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li><Link to="/member" className="hover:text-amber-400 transition">Joined Members</Link></li>
            <li><Link to="/specific/monthly" className="hover:text-amber-400 transition">Monthly Joined</Link></li>
            <li><Link to="/specific/expired" className="hover:text-amber-400 transition">Expired Members</Link></li>
            <li><Link to="/specific/inactive-members" className="hover:text-amber-400 transition">Inactive Members</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="text-sm text-gray-300">Email: support@gymms.com</p>
          <p className="text-sm text-gray-300 mt-2">Phone: +91 91216 36068</p>
          <p className="text-sm text-gray-300 mt-2">Location: Hyderabad, India</p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex flex-col space-y-2 text-sm text-gray-300">
            <a href="#" className="hover:text-blue-400 transition">Facebook</a>
            <a href="#" className="hover:text-pink-400 transition">Instagram</a>
            <a href="#" className="hover:text-sky-400 transition">Twitter</a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-slate-700 text-center text-sm text-gray-400 py-4 px-4">
        © {new Date().getFullYear()} Gym Management System — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
