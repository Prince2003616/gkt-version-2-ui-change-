"use client";
import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Importing icons

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // State for theme

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // You can add logic here to apply the theme to your application
  };

  return (
    <header className={`flex items-center justify-between p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
      <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>My Application</h1>
      <button 
        onClick={toggleTheme} 
        className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition"
        aria-label="Toggle theme"
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>
    </header>
  );
};

export default Header; 