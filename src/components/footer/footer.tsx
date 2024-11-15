import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 bg-gradient-to-b text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span>Copyright © 2024</span>
            <span className="font-semibold">AutoFillMe</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Developed By</span>
            <a
              href="https://github.com/jsdhami/AutoFillMe"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="https://rishikeshpaudel.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="https://www.rishikeshpaudel.vip/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;