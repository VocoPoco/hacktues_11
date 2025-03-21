import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(/images/404NotFound.webp)`,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 py-8 bg-white/30 backdrop-blur-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <button 
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;