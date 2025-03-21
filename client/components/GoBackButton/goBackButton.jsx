import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show the button if there's in-app navigation history
  const canGoBack = window.history.length > 1 && location.key !== "default";

  return (
    <button
      onClick={() => navigate(-1)}
      aria-label="Go back"
      className={`
        fixed top-[80px] left-4 p-2 rounded-full z-[999]
        bg-white shadow-md transition-all duration-300
        hover:bg-[#8c281f]/10 hover:scale-105 group
        ${canGoBack ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
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
