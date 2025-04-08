import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white p-3 mt-4">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} Country Search App</p>
      </div>
    </footer>
  );
};

export default Footer;
