"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddTestimonial: React.FC = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name || !image || !message) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const tid = Date.now().toString(); // Generate unique tid
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials/addtest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tid, name, message, image }),
      });

      if (response.ok) {
        alert("Testimonial added successfully!");
        router.push("/testimonials");
      } else {
        alert("Failed to add testimonial.");
      }
    } catch (error) {
      console.error("Error adding testimonial:", error);
      alert("Failed to add testimonial.");
    }
  };

  return (
    <section className="p-6 md:p-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        Add Your Testimonial
      </h2>
      <div className="max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Your Name"
          className="border rounded-md p-2 w-full mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL (e.g., from Google Drive)"
          className="border rounded-md p-2 w-full mb-4"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <textarea
          placeholder="Your Message"
          className="border rounded-md p-2 w-full mb-4"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit Testimonial
        </button>
      </div>
    </section>
  );
};

export default AddTestimonial;
