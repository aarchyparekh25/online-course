import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="p-12 ">
      <h2 className="text-3xl font-bold text-center text-gray-800">Hear From our Learners</h2>
      <div className="grid grid-cols-4 gap-6 mt-6">
        <div className="p-6 bg-white shadow-md shadow-gray-500 rounded-xl min-w-[45%]">
          <p className="text-gray-600">Learnify has completely transformed the way I learn. The courses are fantastic!</p>
          <p className="mt-4 text-gray-800 font-bold">- Alex J.</p>
        </div>
        <div className="p-6 bg-white shadow-md shadow-gray-500 rounded-xl min-w-[45%]">
          <p className="text-gray-600">The flexibility and expert tutors make this platform exceptional.</p>
          <p className="mt-4 text-gray-800 font-bold">- Maria K.</p>
        </div>
        <div className="p-6 bg-white shadow-md shadow-gray-500 rounded-xl min-w-[45%]">
            <p className="text-gray-600">This is the best platform I've ever used. Highly recommended!</p>
            <p className="mt-4 text-gray-800 font-bold">- John D.</p>
          </div>
          <div className="p-6 bg-white shadow-md shadow-gray-500 rounded-xl min-w-[45%]">
            <p className="text-gray-600">The learning experience here is unparalleled. I love it!</p>
            <p className="mt-4 text-gray-800 font-bold">- Emily R.</p>
          </div>
      </div>
    </section>
  );
};

export default Testimonials;
