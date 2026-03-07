import React from "react";
import banner from '../assets/banner.jpeg'

const HomePage = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-md w-full">
        <img
          src={banner}   // replace with your image path or URL
          alt="Poster"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default HomePage;