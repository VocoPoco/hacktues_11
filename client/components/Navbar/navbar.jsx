import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logOut, isAuthLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Determine if the user is inside a project
  const isInProject = location.pathname.startsWith("/project/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

  const navbarClasses = `
    fixed top-0 left-0 w-full z-50 transition-all duration-300
    ${isHome && !isScrolled ? "bg-transparent" : "bg-white shadow-md border-b border-gray-200"}
  `;

  if (isAuthLoading) return null;

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          FREELENS
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated && (
            <>
              <Link to="/create-project" className="hover:text-[#8c281f] transition">Create Project</Link>
              <Link to="/edit-project" className="hover:text-[#8c281f] transition">Edit Project</Link>
              {isInProject && (
                <Link to="/freelancers" className="hover:text-[#8c281f] transition">Freelancers</Link>
              )}
              <div className="relative">
                <button
                  className="hover:text-[#8c281f] transition"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  More ▾
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute bg-white shadow-lg rounded-md mt-2 w-48 p-2 z-50 transition-opacity duration-200 opacity-100"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <Link to="/project/all" className="block px-4 py-2 hover:bg-gray-100">All Projects</Link>
                  </div>
                )}
              </div>
            </>
          )}

          {!isAuthenticated ? (
            <>
              <button onClick={() => navigate("/login")} className="text-gray-700 hover:text-[#8c281f] transition">Login</button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-[#8c281f] text-white px-4 py-2 rounded-lg hover:bg-[#732018] transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button 
              onClick={logOut} 
              className="text-gray-700 hover:text-[#8c281f] transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200 px-4 py-3 space-y-2">
          {isAuthenticated && (
            <>
              <Link to="/create-project" onClick={() => setIsMobileMenuOpen(false)} className="block">Create Project</Link>
              <Link to="/edit-project" onClick={() => setIsMobileMenuOpen(false)} className="block">Edit Project</Link>
              {isInProject && (
                <Link to="/freelancers" onClick={() => setIsMobileMenuOpen(false)} className="block">Freelancers</Link>
              )}
              <Link to="/project/all" onClick={() => setIsMobileMenuOpen(false)} className="block">All Projects</Link>
            </>
          )}

          {!isAuthenticated ? (
            <>
              <button onClick={() => { setIsMobileMenuOpen(false); navigate("/login"); }} className="block w-full text-left">Login</button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); navigate("/signup"); }}
                className="block w-full text-left bg-[#8c281f] text-white px-4 py-2 rounded-lg mt-2"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button onClick={() => { setIsMobileMenuOpen(false); logOut(); }} className="block w-full text-left">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
