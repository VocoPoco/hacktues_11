import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthNavButton from "../AuthNavButton/authNavButton.jsx";

const Navbar = ({ scrollProgress }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/" && window.scrollY < 20) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const navbarStyle = {
    background: isVisible ? `rgba(255, 251, 249, ${Math.max(scrollProgress, 0.1)})` : "transparent",
    backdropFilter: isVisible ? `blur(${Math.min(scrollProgress * 10, 10)}px)` : "none",
    boxShadow: isVisible ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
    transition: "all 0.3s ease-in-out",
    borderBottom: isVisible ? "1px solid rgba(35, 35, 35, 0.15)" : "none",
    width: "100%", // Ensures full width
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={navbarStyle}>
      <div className="w-full max-w-[100%] px-6 py-4 bg-white">
        <div className="flex justify-between items-center w-full">
          
          {/* Logo */}
          <span
            className="text-xl font-bold cursor-pointer hover:text-[#8c281f] transition-colors"
            style={{ color: `rgba(35, 35, 35, ${Math.max(scrollProgress, 0.7)})` }}
            onClick={() => navigate("/")}
          >
            FREELENS
          </span>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {location.pathname !== "/" && (
              <a
                href="/projects?page=1"
                className="transition-colors hover:text-[#8c281f]"
                style={{ color: `rgba(35, 35, 35, ${Math.max(scrollProgress, 0.7)})` }}
              >
                Projects
              </a>
            )}
            <AuthNavButton scrollProgress={scrollProgress} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
