"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie"; // Importing cookies

interface Testimonial {
  tid: string;
  name: string;
  message: string;
  image: string;
  userId: string; // Assuming each testimonial has a userId
}

const Testimonials: React.FC = () => {
  const [cookies] = useCookies(["token", "userId"]); // Retrieve the token and userId from cookies
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        console.log("Fetching testimonials...");
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials/gettest`);
    
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
    
        const data = await response.json();
    
        if (!Array.isArray(data)) {
          throw new Error("Unexpected response format. Expected an array.");
        }
    
        // Filter out testimonials with invalid images
        const cleanedTestimonials = data.map((testimonial) => ({
          ...testimonial,
          image: testimonial.image?.startsWith("http") ? testimonial.image : "/default-image.webp",
        }));
    
        setTestimonials(cleanedTestimonials);
        console.log("Testimonials fetched:", cleanedTestimonials);
      } catch (err) {
        setError("Error fetching testimonials");
        console.error("Error loading testimonials:", err);
      } finally {
        setLoading(false);
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

  const handleDeleteTestimonial = async (tid: string) => {
    try {
      if (!cookies.token) {
        alert("You must be logged in to delete a testimonial.");
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials/delete/${tid}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
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

  const handleEditTestimonial = (tid: string) => {
    router.push(`/testimonials/edit-testimonial?tid=${tid}`);
  };

  // If the user is logged in, they can edit/delete only their own testimonials
  const currentUserId = cookies.userId; // Retrieve userId from cookies
  console.log("Current User ID from cookies:", currentUserId); // Add debugging for userId

  if (loading) return <div>Loading testimonials...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section id="testimonials" className="p-6 md:p-12 max-w-full overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        Hear From our Learners
      </h2>
      <div
        className="relative w-full "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={marqueeRef} className="flex gap-6 animate-loopRight w-full">
          {extendedTestimonials.length === 0 ? (
            <div className="text-center text-gray-500 w-full">
              No testimonials available.
            </div>
          ) : (
            extendedTestimonials.map((testimonial) => (
              <div
                key={testimonial.key}
                data-testid={`testimonial-${testimonial.tid}`}
                className="p-6 bg-white shadow-md shadow-gray-500 rounded-xl flex-shrink-0 w-full sm:w-72 transition-transform duration-300 hover:scale-105 flex flex-col justify-between h-[200px]" // Ensures same height
              >
                <div>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.image && testimonial.image.startsWith("http") ? testimonial.image : "/default-image.webp"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                      onError={(e) => (e.currentTarget.src = "/default-image.webp")} // Fallback if image fails
                    />
                    <p className="text-gray-800 font-bold">{testimonial.name}</p>
                  </div>
                  <p className="mt-4 text-gray-600 flex-grow">{testimonial.message}</p>
                </div>
                {cookies.token && testimonial.userId === currentUserId && ( // Check if user is logged in and owns the testimonial
                  <div className="flex justify-end gap-2 mt-auto"> {/* Keeps buttons at the bottom */}
                    <button
                      onClick={() => handleEditTestimonial(testimonial.tid)}
                      className="text-[#5A47AB] hover:underline"
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
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="mt-8 text-center">
        {cookies.token && ( // Only show Add Testimonial button if user is logged in
          <Link href="/testimonials/add-testimonial">
            <button className="bg-[#5A47AB] text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Add Your Testimonial
            </button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
