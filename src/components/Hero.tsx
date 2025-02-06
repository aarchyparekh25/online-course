"use client";

import React, { useState } from "react";
import Link from "next/link";

const Hero: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      className="relative w-[100%] h-[70vh] bg-cover bg-center mt-10 overflow-hidden rounded-3xl"
      style={{ backgroundImage: "url('banner3.png')" }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-start h-full px-6 sm:px-12">
        <div className="text-left space-y-4 max-w-lg">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Ready to Start Learning?
          </h1>
          <p className="text-lg text-white">Register now and take the first step towards your goals.</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 px-6 py-3 bg-white text-[#39229A] font-semibold rounded-lg hover:bg-violet-200 text-base sm:text-lg lg:text-xl"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-black">
            <h2 className="text-2xl font-bold mb-6 text-center">Apply As?</h2>
            {/* Buttons Wrapper */}
            <div className="flex flex-col space-y-6">
              {/* Trainee Option */}
              <Link href="/auth">
                <button
                  className="w-full px-6 py-3 bg-white text-black font-semibold rounded-lg border border-black hover:bg-gray-200 text-lg"
                  onClick={() => setShowModal(false)}
                >
                  Trainee
                </button>
              </Link>
              {/* Mentor Option */}
              <Link href="/auth">
                <button
                  className="w-full px-6 py-3 bg-white text-black font-semibold rounded-lg border border-black hover:bg-gray-200 text-lg"
                  onClick={() => setShowModal(false)}
                >
                  Mentor
                </button>
              </Link>
            </div>
            {/* Cancel Button */}
            <button
              onClick={() => setShowModal(false)}
              className="mt-8 w-full text-gray-500 hover:underline text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
