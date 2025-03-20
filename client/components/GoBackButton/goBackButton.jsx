// GoBackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      className="fixed top-4 left-4 p-2 rounded-full transition-all duration-300 z-[999]
                hover:bg-[#8c281f]/10 hover:scale-105 group"
      onClick={() => navigate(-1)}
      aria-label="Go back"
    >
      <svg 
        className="w-6 h-6 text-[#8c281f] group-hover:text-[#732018] transition-colors"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        strokeWidth={2}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M15 19l-7-7 7-7" 
        />
      </svg>
    </button>
  );
};

export default GoBackButton;