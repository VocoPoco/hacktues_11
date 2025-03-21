import React from "react";
import { useNavigate } from "react-router-dom";
import AuthNavButton from "../AuthNavButton/authNavButton.jsx";

const Navbar = ({ scrollProgress }) => {
  const navigate = useNavigate();

  const navbarStyle = {
    background: `rgba(255, 251, 249, ${scrollProgress})`,
    backdropFilter: `blur(${Math.min(scrollProgress * 10, 10)}px)`,
    boxShadow: scrollProgress > 0 ? '0 4px 20px rgba(0,0,0,0.1)' : 'none'
  };

  return (
    <nav 
      className="fixed w-full z-50 transition-all duration-300"
      style={navbarStyle}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <span 
            className="text-xl font-bold cursor-pointer hover:text-[#8c281f] transition-colors"
            style={{ color: `rgba(35, 35, 35, ${scrollProgress})` }}
            onClick={() => navigate("/")}
          >
            FREELENS
          </span>
          <div className="flex items-center gap-6">
            <a 
              href="#features" 
              className="transition-colors hover:text-[#8c281f]"
              style={{ color: `rgba(35, 35, 35, ${scrollProgress})` }}
            >
              Features
            </a>
            <AuthNavButton scrollProgress={scrollProgress} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;