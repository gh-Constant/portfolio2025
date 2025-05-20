import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white text-black border-b border-gray-300 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-xl font-semibold uppercase tracking-wider">CONSTANT SUCHET</div>
        <div className="flex items-center space-x-8">
          <a href="#projects" className="relative group hover:text-gray-700 uppercase tracking-wider pb-1">
            PROJECTS<sup>9</sup>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-right group-hover:origin-left"></span>
          </a>
          <a href="#about" className="relative group hover:text-gray-700 uppercase tracking-wider pb-1">
            ABOUT
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-right group-hover:origin-left"></span>
          </a>
          <a
            href="/resume.pdf" // Assuming the resume is a PDF in the public folder
            target="_blank"
            rel="noopener noreferrer"
            className="relative group hover:text-gray-700 flex items-center uppercase tracking-wider pb-1"
          >
            RÉSUMÉ
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-right group-hover:origin-left"></span>
          </a>
          <a href="#contact" className="relative group hover:text-gray-700 uppercase tracking-wider pb-1">
            CONTACT
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-right group-hover:origin-left"></span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 