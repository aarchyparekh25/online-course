"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close menu after click in mobile view
  };

  return (
    <header className="flex items-center justify-between p-4 md:p-6 bg-[#5A47AB] shadow-md">
      <Link href="/">
        <h2 className="text-xl md:text-2xl font-bold text-[#FBD15B] cursor-pointer">
          Learnify
        </h2>
      </Link>
      <nav className="relative">
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <ul className="hidden md:flex space-x-4">
          <li>
            <a
              onClick={() => scrollToSection('features')}
              className="text-white hover:text-[#FBD15B] font-semibold cursor-pointer"
            >
              Features
            </a>
          </li>
          <li>
            <a
              onClick={() => scrollToSection('testimonials')}
              className="text-white hover:text-[#FBD15B] font-semibold cursor-pointer"
            >
              Testimonials
            </a>
          </li>
          <li>
            <a
              onClick={() => scrollToSection('cta')}
              className="text-white hover:text-[#FBD15B] font-semibold cursor-pointer"
            >
              About Us
            </a>
          </li>
        </ul>

        {isMenuOpen && (
          <ul className="absolute right-0 top-full mt-2 bg-[#5A47AB] shadow-lg rounded-md md:hidden">
            <li>
              <a
                onClick={() => scrollToSection('features')}
                className="block px-4 py-2 text-white hover:text-[#FBD15B] cursor-pointer"
              >
                Features
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection('testimonials')}
                className="block px-4 py-2 text-white hover:text-[#FBD15B] cursor-pointer"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection('cta')}
                className="block px-4 py-2 text-white hover:text-[#FBD15B] cursor-pointer"
              >
                About Us
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
