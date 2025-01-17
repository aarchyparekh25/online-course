import React from 'react';
import Image from 'next/image';

const Features: React.FC = () => {
  return (
    <section id="features" className="p-12 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <Image 
            src="/online-course.jpg" 
            alt="Feature 1" 
            className="mx-auto"
            width={48} // Set the width of the image
            height={48} // Set the height of the image
          />
          <h3 className="mt-4 text-xl font-semibold">Interactive Courses</h3>
          <p className="text-gray-600">Learn with hands-on activities and projects.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <Image 
            src="/online-course.jpg" 
            alt="Feature 2" 
            className="mx-auto"
            width={48}
            height={48}
          />
          <h3 className="mt-4 text-xl font-semibold">Expert Tutors</h3>
          <p className="text-gray-600">Guided learning from industry experts.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <Image 
            src="/online-course.jpg" 
            alt="Feature 3" 
            className="mx-auto"
            width={48}
            height={48}
          />
          <h3 className="mt-4 text-xl font-semibold">Flexible Schedule</h3>
          <p className="text-gray-600">Learn at your own pace anytime, anywhere.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
