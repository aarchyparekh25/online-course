import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-6 bg-[#5A47AB] shadow-md">
      <div className="text-2xl font-bold text-[#FBD15B]">Learnify</div>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#features" className="text-white hover:text-blue-500 font-semibold">Features</a></li>
          <li><a href="#testimonials" className="text-white hover:text-blue-500 font-semibold">Testimonials</a></li>
          <li><a href="#cta" className="text-white hover:text-blue-500 font-semibold">Get Started</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;