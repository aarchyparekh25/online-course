"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Testimonial {
  tid: string;
  name: string;
  message: string;
  image: string;
}

const Testimonials: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials/gettest`);
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
        setTestimonials(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching testimonials");
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

  const handleDeleteTestimonial = async (tid: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials/delete/${tid}`, {
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

  const handleEditTestimonial = (tid: string) => {
    router.push(`/testimonials/edit-testimonial?tid=${tid}`);
  };

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
          {extendedTestimonials.map((testimonial) => (
            <div
              key={testimonial.key}
              data-testid={`testimonial-${testimonial.tid}`}
              className="p-6 bg-white shadow-md shadow-gray-500 rounded-xl flex-shrink-0 w-full sm:w-72 transition-transform duration-300 hover:scale-105"
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
                  onClick={() => handleEditTestimonial(testimonial.tid)}
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
      <div className="mt-8 text-center">
        <Link href="/testimonials/add-testimonial">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Add Your Testimonial
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Testimonials;
