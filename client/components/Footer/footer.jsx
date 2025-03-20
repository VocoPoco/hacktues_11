import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#232323] text-white py-8">
      <div className="container mx-auto px-6 text-center text-sm text-[#616062]">
        © {new Date().getFullYear()} FREELENS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
