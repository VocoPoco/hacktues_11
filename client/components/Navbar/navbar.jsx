// Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./navbar.css";

import {
  IconClipboard,
  IconPencil,
  IconUsers,
  IconFolder,
  IconHome,
  IconDollar,
  IconWrench,
  IconKey,
  IconUserPlus,
  IconLogOut,
} from "./NavIcons";

const NavItem = ({ to, label, icon, onClick, isMobile }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const base = "flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-hover-overlay";
  const active = isActive ? "bg-accent-primary/20 text-accent-primary" : "text-text-primary";

  return onClick ? (
    <button onClick={onClick} className={`${base} ${active}`}>
      <span className="nav-icon">{icon}</span>
      {!isMobile && <span>{label}</span>}
    </button>
  ) : (
    <Link to={to} className={`${base} ${active}`}>
      <span className="nav-icon">{icon}</span>
      {!isMobile && <span>{label}</span>}
    </Link>
  );
};

const Navbar = ({ mode, lockLayout, toggleGeneratorMode }) => {
  const { isAuthenticated, logOut, isAuthLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isAuthLoading) return null;

  let navItems;
  if (mode === "generate") {
    navItems = (
      <>
        <NavItem
          label="HomePages"
          icon={<IconHome />}
          onClick={() => navigate("/")}
          isMobile={isMobile}
        />
        <NavItem
          label="Pricing"
          icon={<IconDollar />}
          onClick={() => navigate("/pricing")}
          isMobile={isMobile}
        />
        <NavItem
          label="Builders"
          icon={<IconWrench />}
          onClick={() => navigate("/custom")}
          isMobile={isMobile}
        />
      </>
    );
  } else {
    if (isAuthenticated) {
      navItems = (
        <>
          <NavItem
            to="/create-project"
            label="Create Project"
            icon={<IconClipboard />}
            isMobile={isMobile}
          />
          <NavItem
            to="/edit-project"
            label="Edit Project"
            icon={<IconPencil />}
            isMobile={isMobile}
          />
          {location.pathname.startsWith("/project/") && (
            <NavItem
              to="/freelancers"
              label="Freelancers"
              icon={<IconUsers />}
              isMobile={isMobile}
            />
          )}
          <NavItem
            to="/project/all"
            label="All Projects"
            icon={<IconFolder />}
            isMobile={isMobile}
          />
        </>
      );
    } else {
      navItems = (
        <>
          <NavItem to="/" label="Home" icon={<IconHome />} isMobile={isMobile} />
          
        </>
      );
    }
  }

  const modeSwitchButton = (
    <button
      onClick={toggleGeneratorMode}
      className="flex items-center gap-3 p-3 rounded-lg bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/20 transition-colors"
    >
      <span>{mode === "generate" ? "Business Mode" : "Generator Mode"}</span>
    </button>
  );

  const authButtons = !isAuthenticated ? (
    <>
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-hover-overlay text-text-primary"
      >
        <span className="nav-icon">
          <IconKey />
        </span>
        {!isMobile && <span>Login</span>}
      </button>
      <button
        onClick={() => navigate("/signup")}
        className="accent-button font-cormorant"
      >
        <span className="nav-icon">
        <span className="button-sparkle"></span>
        <span className="button-sparkle"></span>
          <IconUserPlus />
        </span>
        {!isMobile && <span>Sign Up</span>}
      </button>
    </>
  ) : (
    <button
      onClick={logOut}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-hover-overlay text-text-primary"
    >
      <span className="nav-icon">
        <IconLogOut />
      </span>
      {!isMobile && <span>Logout</span>}
    </button>
  );

  return (
    <>
      {isMobile ? (
        <header className="fixed top-0 left-0 right-0 bg-bg-secondary border-b border-divider z-40 px-4 py-2 flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              {navItems}
              {modeSwitchButton}
            </div>
            <div className="flex gap-4">{authButtons}</div>
          </div>
        </header>
      ) : (
        <aside className="fixed top-0 left-0 w-64 h-full z-40 flex-col px-6 pt-8 pb-6 bg-bg-secondary border-r border-divider shadow-sm flex">
          <Link to="/" className="text-2xl font-bold text-accent-primary mb-10">
            FREELENS
          </Link>
          <div className="nav-items flex flex-col gap-4 flex-1">
            {navItems}
            {modeSwitchButton}
          </div>
          <div className="auth-section mt-auto flex flex-col gap-3">
            {authButtons}
          </div>
        </aside>
      )}
    </>
  );
};

export default Navbar;