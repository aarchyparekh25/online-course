import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="p-3 bg-black text-center text-white text-sm">
      <p>&copy; 2025 Learnify. All rights reserved.</p>
      <p className="mb-2 font-semibold">Find us on</p>

      <div className="flex justify-center space-x-3 mb-2">
        <div className="p-1 rounded-full hover:bg-[#5A47AB]">
          <FaFacebookF size={16} className="text-white" />
        </div>
        <div className="p-1 rounded-full hover:bg-[#5A47AB]">
          <FaTwitter size={16} className="text-white" />
        </div>
        <div className="p-1 rounded-full hover:bg-[#5A47AB]">
          <FaInstagram size={16} className="text-white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
