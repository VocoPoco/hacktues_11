import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-[#8c281f]">ProjectFlow</div>
        <button
          className="bg-[#8c281f] text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
          onClick={() => navigate("/get-started")}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
