"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface Testimonial {
  tid: string;
  name: string;
  message: string;
  image: string;
}

const Testimonials: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({ 
    tid: '',
    name: "", 
    message: "", 
    image: "/default-image.webp" 
  });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch testimonials on component mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials/gettest`);
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        setTestimonials(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching testimonials');
        setLoading(false);
        console.error(err);
      }
    };

    fetchTestimonials();
  }, []);

  const extendedTestimonials = [
    ...testimonials.map((testimonial, idx) => ({ ...testimonial, key: `${testimonial.tid}-${idx}` })),
    ...testimonials.map((testimonial, idx) => ({ ...testimonial, key: `${testimonial.tid}-${idx + testimonials.length}` })),
    ...testimonials.map((testimonial, idx) => ({ ...testimonial, key: `${testimonial.tid}-${idx + testimonials.length * 2}` })),
  ];

  const handleMouseEnter = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = "paused";
    }
  };

  const handleMouseLeave = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = "running";
    }
  };

  // Handle new testimonial submission
  const handleSubmitTestimonial = async () => {
    if (!newTestimonial.name || !newTestimonial.message) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Generate a unique tid (you might want to handle this on the backend)
      const tid = Date.now().toString();
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials/addtest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newTestimonial,
          tid: tid
        }),
      });

      if (response.ok) {
        const savedTestimonial = await response.json();
        setTestimonials([...testimonials, savedTestimonial]);
        setNewTestimonial({ tid: '', name: "", message: "", image: "/default-image.webp" });
        alert("Testimonial added successfully!");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to add testimonial.");
      }
    } catch (error) {
      console.error("Error adding testimonial:", error);
      alert("Failed to add testimonial.");
    }
  };

  // Handle delete testimonial
  const handleDeleteTestimonial = async (tid: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials/deletetest/${tid}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTestimonials(testimonials.filter((testimonial) => testimonial.tid !== tid));
        alert("Testimonial deleted successfully!");
      } else {
        alert("Failed to delete testimonial.");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  // Handle edit testimonial
  const handleEditTestimonial = async (testimonial: Testimonial) => {
    const updatedMessage = prompt("Edit your testimonial message:", testimonial.message);

    if (!updatedMessage) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials/edit/${testimonial.tid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          ...testimonial, 
          message: updatedMessage 
        }),
      });

      if (response.ok) {
        const updatedTest = await response.json();
        setTestimonials(
          testimonials.map((t) =>
            t.tid === testimonial.tid ? updatedTest : t
          )
        );
        alert("Testimonial updated successfully!");
      } else {
        alert("Failed to update testimonial.");
      }
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  if (loading) return <div>Loading testimonials...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section id="testimonials" className="p-6 md:p-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        Hear From our Learners
      </h2>
      <div
        className="overflow-hidden relative w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={marqueeRef} className="flex gap-6 animate-loopRight">
          {extendedTestimonials.map((testimonial) => (
            <div
              key={testimonial.key}
              className="p-6 bg-white shadow-md shadow-gray-500 rounded-xl flex-shrink-0 w-72 transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image || "/default-image.webp"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <p className="text-gray-800 font-bold">{testimonial.name}</p>
              </div>
              <p className="mt-4 text-gray-600">{testimonial.message}</p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleEditTestimonial(testimonial)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTestimonial(testimonial.tid)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Testimonial Form */}
      <div className="mt-8">
        <h3 className="text-xl font-bold">Add Your Testimonial</h3>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border rounded-md p-2 w-full mb-2"
            value={newTestimonial.name}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
          />
          <textarea
            placeholder="Your Message"
            className="border rounded-md p-2 w-full mb-2"
            rows={4}
            value={newTestimonial.message}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, message: e.target.value })}
          ></textarea>
          <button
            onClick={handleSubmitTestimonial}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit Testimonial
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;