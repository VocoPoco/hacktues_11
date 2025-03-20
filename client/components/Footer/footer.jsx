import React from "react";
import { useNavigate } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="footer text-red-300">
      <div className="footer-container">
        {/* Logo */}
        <div
          className="footer-logo"
          onClick={() => handleNavigation("/")}
          aria-label="Navigate to home"
        >
          <h1>NRG</h1>
        </div>

        {/* Navigation Links */}
        <div className="footer-nav">
          <ul>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
            <li><a href="/faqs">FAQs</a></li>
            <li><a href="/my-order">My Order</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p>© {new Date().getFullYear()} NRG. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
