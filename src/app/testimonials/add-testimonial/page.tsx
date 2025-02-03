"use client";

import React, { useState } from "react";
import Link from "next/link";

const AddTestimonial: React.FC = () => {
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    message: "",
    image: "",
  });

  const handleSubmitTestimonial = async () => {
    if (!newTestimonial.name || !newTestimonial.message) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const tid = Date.now().toString();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials/addtest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newTestimonial,
            tid: tid,
          }),
        }
      );

      if (response.ok) {
        alert("Testimonial added successfully!");
        setNewTestimonial({ name: "", message: "", image: "" });
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to add testimonial.");
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
      <div>
        <input
          type="text"
          placeholder="Your Name"
          className="border rounded-md p-2 w-full mb-2"
          value={newTestimonial.name}
          onChange={(e) =>
            setNewTestimonial({ ...newTestimonial, name: e.target.value })
          }
        />
        <textarea
          placeholder="Your Message"
          className="border rounded-md p-2 w-full mb-2"
          rows={4}
          value={newTestimonial.message}
          onChange={(e) =>
            setNewTestimonial({ ...newTestimonial, message: e.target.value })
          }
        ></textarea>
        <input
          type="text"
          placeholder="Google Drive Image Link (optional)"
          className="border rounded-md p-2 w-full mb-2"
          value={newTestimonial.image}
          onChange={(e) =>
            setNewTestimonial({ ...newTestimonial, image: e.target.value })
          }
        />
        <Link href = "/testimonials">
        <button
          onClick={handleSubmitTestimonial}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit Testimonial
        </button>
        </Link>
      </div>
    </section>
  );
};

export default AddTestimonial;
