"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCookies } from "react-cookie";

const isValidImageUrl = (url: string) => {
  try {
    return url.startsWith("http://") || url.startsWith("https://");
  } catch {
    return false;
  }
};

const AddTestimonial: React.FC = () => {
  const router = useRouter();
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    message: "",
    image: "",
  });
  const [cookies] = useCookies(['token']); // Corrected to match your cookie name

  const handleSubmitTestimonial = async () => {
    if (!newTestimonial.name || !newTestimonial.message) {
      alert("Please fill out all fields.");
      return;
    }

    let validImageUrl = newTestimonial.image.trim();
    if (validImageUrl && !validImageUrl.startsWith("http")) {
      validImageUrl = "/default-image.webp"; // Set fallback
    }

    const token = cookies.token;  // Corrected token access from cookies

    if (!token) {
      alert("You must be logged in to add a testimonial.");
      return;
    }

    try {
      const tid = Date.now().toString();
      const testimonialData: any = {
        name: newTestimonial.name,
        message: newTestimonial.message,
        tid: tid,
        image: validImageUrl, // Use cleaned URL
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials/addtest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass token in the header
          },
          body: JSON.stringify(testimonialData),
          credentials: "include", // Ensure cookies are sent along with the request
        }
      );

      if (response.ok) {
        alert("Testimonial added successfully!");
        setNewTestimonial({ name: "", message: "", image: "" });
        router.push("/testimonials");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to add testimonial.");
      }
    } catch (error) {
      console.error("Error adding testimonial:", error);
      alert("Failed to add testimonial.");
    }
  };

  const imageSrc =
    newTestimonial.image && isValidImageUrl(newTestimonial.image)
      ? encodeURI(newTestimonial.image)
      : "/placeholder.jpg";

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
          placeholder="Image Link (optional)"
          className="border rounded-md p-2 w-full mb-2"
          value={newTestimonial.image}
          onChange={(e) =>
            setNewTestimonial({ ...newTestimonial, image: e.target.value })
          }
        />

        <div className="mb-4 flex justify-center">
          {isValidImageUrl(newTestimonial.image) ? (
            <Image
              src={imageSrc}
              alt="Testimonial"
              width={200}
              height={200}
              className="rounded-md"
            />
          ) : (
            <p className="text-gray-500">Invalid image URL</p>
          )}
        </div>

        <button
          onClick={handleSubmitTestimonial}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit Testimonial
        </button>
      </div>
    </section>
  );
};

export default AddTestimonial;
