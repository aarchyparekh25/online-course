"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie"; // Import react-cookie

interface Course {
  id: number;
  title: string;
  instructor: string;
  image: string;
  rating: number;
  reviews: string;
  category: string;
  details: string;
}

const Course: React.FC = () => {
  const [cookies] = useCookies(["token"]); // Check for JWT token in cookies
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // If there's no token, redirect to the login page
  useEffect(() => {
    if (!cookies.token) {
      router.push("/auth"); // Redirect to login if not authenticated
    }
  }, [cookies.token, router]);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch("/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error loading courses:", error));
  }, []);

  const categories = [
    "All",
    "Project Management",
    "UI/UX Design",
    "Digital Marketing",
    "Data Science",
    "Data Analysis",
    "Front-End Development",
  ];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const displayedCourses = showAll ? filteredCourses : filteredCourses.slice(0, 8);

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-[#5A47AB] mb-6">
        Launch a new career in as little as 6 months
      </h1>

      {/* Filter Section */}
      <div className="mb-6 relative">
        {/* Dropdown for small screens */}
        <div className="md:hidden">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-4 py-2 rounded-full font-semibold text-sm sm:text-base bg-white text-[#5A47AB] border border-[#5A47AB] hover:bg-[#5A47AB] hover:text-white transition-colors w-full text-left"
          >
            {selectedCategory}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 inline ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="mt-2 bg-white border border-[#5A47AB] rounded-md shadow-lg">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-[#5A47AB] text-left hover:bg-[#5A47AB] hover:text-white"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category Buttons for larger screens */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold text-sm sm:text-base ${
                  selectedCategory === category
                    ? "bg-[#5A47AB] text-white"
                    : "bg-white text-[#5A47AB] border border-[#5A47AB]"
                } hover:bg-[#5A47AB] hover:text-white transition-colors`}
              >
                {category}
              </button>
            ))}
          </div>
          {filteredCourses.length > 8 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="ml-4 px-6 py-2 rounded-full font-semibold bg-[#5A47AB] text-white hover:bg-[#4A3A92] transition-colors"
            >
              {showAll ? "Hide Options" : "Show All"}
            </button>
          )}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-md flex flex-col min-h-[400px] transition-transform duration-300 hover:scale-105"
          >
            <div className="relative w-full h-1/2 overflow-hidden rounded-t-xl">
              <Image
                src={course.image}
                alt={course.title}
                className="object-cover"
                fill
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
              <p className="text-sm text-gray-600">{course.instructor}</p>
              <div className="flex items-center mt-2 text-yellow-500">
                <span className="font-bold">{course.rating}</span>
                <span className="ml-2 text-gray-500">{course.reviews}</span>
              </div>
              <button
                onClick={() => setSelectedCourse(course)}
                className="mt-auto text-[#5A47AB] hover:underline"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Course Details */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 z-50"
            >
              ✕
            </button>
            {/* Image */}
            <div className="w-full h-64 relative rounded-t-xl overflow-hidden">
              <Image
                src={selectedCourse.image}
                alt={selectedCourse.title}
                className="object-cover"
                width={800} // Adjust as needed
                height={400}
              />
            </div>
            {/* Modal Content */}
            <div className="p-4 overflow-y-auto max-h-[50vh]">
              <h3 className="text-2xl font-bold text-gray-800">{selectedCourse.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{selectedCourse.instructor}</p>
              <div className="flex items-center mb-4 text-yellow-500">
                <span className="font-bold">{selectedCourse.rating}</span>
                <span className="ml-2 text-gray-500">{selectedCourse.reviews}</span>
              </div>
              <p className="text-gray-700">{selectedCourse.details}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
