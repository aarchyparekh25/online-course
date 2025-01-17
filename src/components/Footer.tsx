import React from 'react';
import { FaFacebookF,FaTwitter,FaInstagram, } from 'react-icons/fa';
const Footer: React.FC = () => {
  return (
    <footer className="p-6 bg-[#F7E3AF] text-center text-[#333333]">
      <p>&copy; 2025 Learnify. All rights reserved.</p>
      <p className="mb-4 font-semibold text-lg">Find us on</p>

      <div className="flex justify-center space-x-4 mb-4">
  <div className="p-2 rounded-full hover:bg-[#5A47AB]">
    <FaFacebookF size={20} className="text-[#333333]" />
  </div>
  <div className="p-2 rounded-full hover:bg-[#5A47AB]">
    <FaTwitter size={20} className="text-[#333333]" />
  </div>
  <div className="p-2 rounded-full hover:bg-[#5A47AB]">
    <FaInstagram size={20} className="text-[#333333]" />
  </div>
</div>

    </footer>
  );
};

export default Footer;
