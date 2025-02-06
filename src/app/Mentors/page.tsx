'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getCookie } from 'react-cookie';

interface Mentor {
  id: number;
  name: string;
  role: string;
  category: string;
  rating: number;
  reviews: string;
  image: string;
}

const Mentors: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAll, setShowAll] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const token = getCookie('jwtToken'); // Assuming your JWT token is stored as 'jwtToken'
    if (!token) {
      // Redirect to login page if not authenticated
      router.push('/auth');
      return;
    }

    // Fetch the mentors data from the JSON file
    fetch('/mentors.json')
      .then((response) => response.json())
      .then((data) => {
        setMentors(data);
        setFilteredMentors(data);
      });
  }, [router]);

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredMentors(mentors);
    } else {
      setFilteredMentors(mentors.filter((mentor) => mentor.category === category));
    }
  };

  const displayedMentors = showAll ? filteredMentors : filteredMentors.slice(0, 8);

  return (
    <div className="p-12 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Meet Our Experts
      </h2>

      {/* Category Filter */}
      <div className="text-center mb-6">
        {/* Buttons for Larger Screens */}
        <div className="hidden sm:flex flex-wrap justify-center gap-4">
          {['All', 'Project Management', 'UI/UX Design', 'Digital Marketing', 'Data Science', 'Data Analysis', 'Front-End Development'].map(
            (category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-4 py-2 rounded-full border ${
                  selectedCategory === category
                    ? 'bg-[#5A47AB] text-white border-[#5A47AB]'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Dropdown for Small Screens */}
        <div className="sm:hidden">
          <select
            value={selectedCategory}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#5A47AB] w-full"
          >
            <option value="All">All Categories</option>
            <option value="Project Management">Project Management</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Data Science">Data Science</option>
            <option value="Data Analysis">Data Analysis</option>
            <option value="Front-End Development">Front-End Development</option>
          </select>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="p-4 bg-white rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-105"
          >
            <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full bg-gray-200">
              <Image
                src={mentor.image}
                alt={mentor.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">{mentor.name}</h3>
            <p className="text-gray-600 text-sm">{mentor.role}</p>
            <p className="text-yellow-500 mt-2">⭐ {mentor.rating}</p>
            <p className="text-gray-500 text-sm">{mentor.reviews}</p>
          </div>
        ))}
      </div>

      {/* Show All / Hide Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-4 py-2 bg-[#5A47AB] text-white rounded-md hover:bg-[#3E3192] transition-colors"
        >
          {showAll ? 'Hide' : 'Show All'}
        </button>
      </div>
    </div>
  );
};

export default Mentors;
