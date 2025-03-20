import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import icons from react-icons (make sure you have installed react-icons)
import { FaHome, FaCog, FaConciergeBell } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  const [profileHovered, setProfileHovered] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Left Section: Brand Logo with Favicon */}
        <div className="navbar-section left">
          <div
            className="logo"
            onClick={() => handleNavigation("/")}
            aria-label="Navigate to home"
          >
           FRI
           <img src="/icons/favicon.ico" alt="Brand Icon" className="brand-icon" />
            
          </div>
        </div>

        {/* Center Section: Navigation Links as Icons */}
        <div className="navbar-section center">
          <div className="nav-links">
            <div className="nav-link" onClick={() => handleNavigation("/")}>
              <FaHome size={24} />
              <span className="tooltip">Home</span>
            </div>
            <div className="nav-link" onClick={() => handleNavigation("/service")}>
              <FaConciergeBell size={24} />
              <span className="tooltip">Service</span>
            </div>
            <div className="nav-link" onClick={() => handleNavigation("/settings")}>
              <FaCog size={24} />
              <span className="tooltip">Settings</span>
            </div>
          </div>
        </div>

        {/* Right Section: Profile with Hover Details */}
        <div className="navbar-section right">
          <div
            className="profile-container"
            onMouseEnter={() => setProfileHovered(true)}
            onMouseLeave={() => setProfileHovered(false)}
          >
            <div className="profile-image" />
            {profileHovered && (
              <div className="profile-details">
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Email:</strong> john.doe@example.com</p>
                <button onClick={() => navigate("/profile/edit")}>Edit</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
