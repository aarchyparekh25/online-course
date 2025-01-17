import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-[#5A47AB] p-12 text-center">
      <h1 className="text-4xl font-bold text-white">Learn Anything, Anytime, Anywhere</h1>
      <p className="mt-4 text-lg text-white font-semibold">Join millions of learners worldwide and unlock your potential today.</p>
      <button className="mt-6 px-6 py-3 bg-[#39229A] text-white rounded-lg hover:bg-blue-700">Get Started</button>
    </section>
  );
};

export default Hero;
