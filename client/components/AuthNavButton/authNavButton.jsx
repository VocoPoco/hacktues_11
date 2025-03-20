// AuthNavButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AuthNavButton = ({ scrollProgress }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex gap-4 items-center">
      {!isAuthenticated ? (
        <>
          <button
            className="px-4 py-2 rounded-lg transition-all duration-300"
            style={{
              color: `rgba(35, 35, 35, ${scrollProgress * 0.8})`,
              opacity: 0.8 + (scrollProgress * 0.2)
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#732018]"
            style={{
              backgroundColor: `rgba(140, 40, 31, ${scrollProgress})`,
              color: `rgba(255, 255, 255, ${0.8 + (scrollProgress * 0.2)})`
            }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </>
      ) : (
        <button
          className="px-4 py-2 rounded-lg transition-all duration-300 bg-[#8c281f] text-white hover:bg-[#732018]"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
      )}
    </div>
  );
};

export default AuthNavButton;