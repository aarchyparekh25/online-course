"use client";

import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { FiPhone } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import Link from 'next/link'; // Import Next.js Link

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white text-sm">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center md:items-start">
        {/* Contact Information */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <div className="mb-2 text-xl font-bold">Learnify</div>
          <div className="flex items-center mb-2">
            <HiOutlineMail className="mr-2 text-lg" />
            <p>inquiry@gmail.com</p>
          </div>
          <div className="flex items-center mb-2">
            <FiPhone className="mr-2 text-lg" />
            <p>+91 2233 4455 66</p>
          </div>
          <div className="flex items-center">
            <HiOutlineLocationMarker className="mr-2 text-lg" />
            <p>Somewhere in the World</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="text-center md:text-left">
          <div className="mb-4">
            <Link href="/">
            <h3 className="font-semibold mb-2">Home</h3>
            </Link>
            <ul>
              <li><Link href="/#features">Features</Link></li>
              <li><Link href="/#testimonials">Testimonials</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">About Us</h3>
            <ul>
              <li><Link href="/company">Company</Link></li>
              <li><Link href="/goals">Our Goals</Link></li>
              <li><Link href="/privacy-policy">Privacy policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Profiles */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-2 text-center">Social Profiles</h3>
          <div className="flex justify-center md:justify-start space-x-3">
            <div className="p-2 rounded-full hover:bg-[#5A47AB]">
              <FaFacebookF size={16} className="text-white" />
            </div>
            <div className="p-2  rounded-full hover:bg-[#5A47AB]">
              <FaTwitter size={16} className="text-white" />
            </div>
            <div className="p-2  rounded-full hover:bg-[#5A47AB]">
              <FaLinkedin size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-center py-3">
        <p>&copy; 2025 Learnify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
