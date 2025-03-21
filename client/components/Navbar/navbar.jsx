import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AuthNavButton from "../AuthNavButton/authNavButton.jsx";

const Navbar = ({ scrollProgress }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logOut } = useAuth();  // logOut comes from AuthContext
  const [isVisible, setIsVisible] = useState(false); // start invisible
  const [menuOpen, setMenuOpen] = useState(null);    // for dropdown menus

  useEffect(() => {
    const handleScroll = () => {
      // If on home page and near the top, hide the navbar
      if (location.pathname === "/" && window.scrollY < 20) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Check scroll position on mount (in case user isn't at top)
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const navbarStyle = {
    background: isVisible ? `rgba(255, 251, 249, ${Math.max(scrollProgress, 0.1)})` : "transparent",
    backdropFilter: isVisible ? `blur(${Math.min(scrollProgress * 10, 10)}px)` : "none",
    boxShadow: isVisible ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
    borderBottom: isVisible ? "1px solid rgba(35, 35, 35, 0.15)" : "none",
    transition: "all 0.3s ease-in-out",
    width: "100%",
  };

  return (
    <nav
      style={navbarStyle}
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    >
      <div className="w-full max-w-[100%] px-6 py-4 bg-white flex items-center justify-between">
        
        {/* Logo */}
        <span
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer hover:text-[#8c281f] transition-colors"
          style={{ color: `rgba(35, 35, 35, ${Math.max(scrollProgress, 0.7)})` }}
        >
          FREELENS
        </span>

        {/* Right Side: Navigation & Auth */}
        <div className="flex items-center gap-6">
          {/* Only show these if user is logged in */}
          {user && (
            <>
              <a href="/create-project" className="hover:text-[#8c281f] transition">
                Create Project
              </a>
              <a href="/edit-project" className="hover:text-[#8c281f] transition">
                Edit Project
              </a>

              {/* Topic Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(menuOpen === "topic" ? null : "topic")}
                  className="hover:text-[#8c281f] transition"
                >
                  Topic ▾
                </button>
                {menuOpen === "topic" && (
                  <div className="absolute left-0 mt-2 bg-white shadow-md rounded-lg p-2 w-40">
                    <a href="/freelancers" className="block px-4 py-2 hover:bg-gray-100">
                      Freelancers
                    </a>
                  </div>
                )}
              </div>

              {/* Project Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(menuOpen === "project" ? null : "project")}
                  className="hover:text-[#8c281f] transition"
                >
                  Project ▾
                </button>
                {menuOpen === "project" && (
                  <div className="absolute left-0 mt-2 bg-white shadow-md rounded-lg p-2 w-40">
                    <a href="/project/view-project" className="block px-4 py-2 hover:bg-gray-100">
                      View Project
                    </a>
                    <a href="/project/all" className="block px-4 py-2 hover:bg-gray-100">
                      All Projects
                    </a>
                  </div>
                )}
              </div>
            </>
          )}

          {/* If user is logged in, show logout; otherwise show login/signup */}
          {user ? (
            <button
              onClick={logOut}
              className="hover:text-[#8c281f] transition"
            >
              Logout
            </button>
          ) : (
            <AuthNavButton scrollProgress={scrollProgress} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
