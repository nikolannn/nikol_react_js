// src/components/Header.js
import React from 'react';
// import './Header.css';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 shadow-md">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
          Visualizing Country Information
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
          ASA NA COUNTRY ANG NEXT DESTINATION
        </p>
      </div>
    </header>
  );
};

export default Header;
