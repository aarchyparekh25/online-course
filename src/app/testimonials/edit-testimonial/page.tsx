"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Testimonial {
  tid?: string;
  _id?: string;
  name: string;
  message: string;
  image: string;
}

const EditTestimonial: React.FC = () => {
  const searchParams = useSearchParams();
  const tid = searchParams.get("tid");
  const router = useRouter();

  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [updatedMessage, setUpdatedMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tid) {
      setError("Invalid testimonial ID.");
      setLoading(false);
      return;
    }

    const fetchTestimonial = async () => {
      try {
        // Fetch all testimonials
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials/gettest`);

        if (!response.ok) {
          throw new Error(`Failed to fetch testimonials: ${response.statusText}`);
        }

        const data = await response.json();

        // Check if response is an array
        if (!Array.isArray(data)) {
          throw new Error("Unexpected data format received.");
        }

        // Find the testimonial with the correct ID field (either `tid` or `_id`)
        const foundTestimonial = data.find((t: Testimonial) => t.tid === tid || t._id === tid);

        if (!foundTestimonial) {
          throw new Error("Testimonial not found");
        }

        setTestimonial(foundTestimonial);
        setUpdatedMessage(foundTestimonial.message);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching testimonial:", err);
        setError("Error fetching testimonial.");
        setLoading(false);
      }
    };

    fetchTestimonial(); // ✅ Call function inside useEffect
  }, [tid]);

  const handleUpdateTestimonial = async () => {
    if (!testimonial) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials/edit/${testimonial.tid || testimonial._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...testimonial, message: updatedMessage }),
        }
      );

      if (response.ok) {
        alert("Testimonial updated successfully!");
        router.push("/testimonials");
      } else {
        alert("Failed to update testimonial.");
      }
    } catch (error) {
      console.error("Error updating testimonial:", error);
      alert("Error updating testimonial.");
    }
  };

  if (loading) return <div>Loading testimonial...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <section className="p-6 md:p-12 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Testimonial</h2>
      {testimonial && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-800 font-semibold mb-2">{testimonial.name}</p>
          <textarea
            className="w-full p-2 border rounded-md"
            rows={4}
            value={updatedMessage}
            onChange={(e) => setUpdatedMessage(e.target.value)}
          />
          <div className="mt-4 flex justify-between">
            <button onClick={() => router.back()} className="px-4 py-2 bg-gray-500 text-white rounded-md">
              Cancel
            </button>
            <button onClick={handleUpdateTestimonial} className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Update
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditTestimonial;
