'use client'; // Marks this as a Client Component

import React from 'react';

function InteractiveButtons() {
  // Example functions for each button
  const handleStoriesClick = () => {
    alert('Navigating to Stories');
  };

  const handleReunionClick = () => {
    alert('Navigating to Reunion');
  };

  const handleMemoriesClick = () => {
    alert('Navigating to Memories');
  };

  const handleContactUsClick = () => {
    alert('Navigating to Contact Us');
  };

  const handleLoginClick = () => {
    alert('Navigating to Login');
  };

  return (
    <div className="w-full lg:w-4/5 flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0 lg:space-x-6">
      <button
        className="w-full lg:w-1/5 bg-gray-800 text-white text-center py-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:bg-gray-700"
        onClick={handleStoriesClick}
      >
        Stories
      </button>
      <button
        className="w-full lg:w-1/5 bg-gray-800 text-white text-center py-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:bg-gray-700"
        onClick={handleReunionClick}
      >
        Reunion
      </button>
      <button
        className="w-full lg:w-1/5 bg-gray-800 text-white text-center py-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:bg-gray-700"
        onClick={handleMemoriesClick}
      >
        Memories
      </button>
      <button
        className="w-full lg:w-1/5 bg-gray-800 text-white text-center py-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:bg-gray-700"
        onClick={handleContactUsClick}
      >
        Contact Us
      </button>
      <button
        className="w-full lg:w-1/5 bg-gray-800 text-white text-center py-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:bg-gray-700"
        onClick={handleLoginClick}
      >
        Login
      </button>
    </div>
  );
}

export default InteractiveButtons;