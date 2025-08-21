import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
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
  IconBarChart,
  IconKey,
  IconUserPlus,
  IconLogOut,
  IconGrid,
  IconEye
} from "./NavIcons";

// Lock/Unlock Icon Component
const LockIcon = ({ isLocked }) => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {isLocked ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
      />
    )}
  </svg>
);

const NavItem = ({ to, label, icon, onClick, isMobile, isActive = false, color }) => {
  const location = useLocation();
  const isRouteActive = location.pathname === to;
  const base = "flex items-center gap-3 p-3 rounded-lg transition-all duration-200 font-medium";
  const active = isActive || isRouteActive ? "mode-active" : "text-text-primary hover:bg-slate-100 dark:hover:bg-slate-800";

  const handleClick = useCallback((e) => {
    if (onClick) {
      e.preventDefault();
      try {
        onClick();
      } catch (error) {
        console.error('NavItem click error:', error);
      }
    }
  }, [onClick]);

  const iconElement = typeof icon === 'function' ? <icon /> : icon;

  return onClick ? (
    <button 
      onClick={handleClick} 
      className={`${base} ${active} ${isMobile ? "mobile-nav-item" : ""}`}
    >
      <span className={`nav-icon ${color || ''}`}>{iconElement}</span>
      {!isMobile && <span>{label}</span>}
    </button>
  ) : (
    <Link 
      to={to} 
      className={`${base} ${active} ${isMobile ? "mobile-nav-item" : ""}`}
    >
      <span className={`nav-icon ${color || ''}`}>{iconElement}</span>
      {!isMobile && <span>{label}</span>}
    </Link>
  );
};

const Navbar = ({ 
  mode, 
  toggleGeneratorMode, 
  sidebarVisible, 
  sidebarLocked,
  toggleSidebarLock,
  onSectionClick,
  activeSection,
  onToggleProgress
}) => {
  const { isAuthenticated, logOut, isAuthLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(() => {
    try {
      return window.innerWidth < 768;
    } catch (error) {
      console.error('Error detecting mobile:', error);
      return false;
    }
  });
  const resizeTimeoutRef = useRef(null);

  const handleSectionClick = useCallback((sectionKey) => {
    console.log('Navbar section click:', sectionKey, 'onSectionClick:', !!onSectionClick);
    if (onSectionClick) {
      try {
        onSectionClick(sectionKey);
      } catch (error) {
        console.error('Error handling section click:', error);
      }
    }
  }, [onSectionClick]);

  const navItems = useMemo(() => {
    if (!mode) return null;

    const items = [
      { key: 'home', label: 'Home', icon: IconHome, color: 'text-blue-600' },
      { key: 'headers', label: 'Headers', icon: IconClipboard, color: 'text-green-600' },
      { key: 'hero', label: 'Hero', icon: IconGrid, color: 'text-purple-600' },
      { key: 'features', label: 'Features', icon: IconWrench, color: 'text-orange-600' },
      { key: 'audience', label: 'Audience', icon: IconBarChart, color: 'text-red-600' },
      { key: 'pricing', label: 'Pricing', icon: IconDollar, color: 'text-emerald-600' },
      { key: 'create', label: 'Create Project', icon: IconFolder, color: 'text-indigo-600' },
      { key: 'dashboard', label: 'Dashboard', icon: IconBarChart, color: 'text-cyan-600' },
      { key: 'footers', label: 'Footers', icon: IconClipboard, color: 'text-pink-600' }
    ];

    return items.map(({ key, label, icon: Icon, color }) => (
      <NavItem
        key={key}
        icon={Icon}
        label={label}
        onClick={() => handleSectionClick(key)}
        isActive={activeSection === key}
        color={color}
      />
    ));
  }, [mode, activeSection, handleSectionClick]);

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        try {
          setIsMobile(window.innerWidth < 768);
        } catch (error) {
          console.error('Error handling resize:', error);
        }
      }, 100);
    };

    try {
      window.addEventListener("resize", handleResize);
    } catch (error) {
      console.error('Error adding resize listener:', error);
    }

    return () => {
      try {
        window.removeEventListener("resize", handleResize);
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }
      } catch (error) {
        console.error('Error cleaning up resize listener:', error);
      }
    };
  }, []);

  const isDisabled = location.pathname === "/" && !mode && !isAuthenticated;

  const handleModeToggle = useCallback(() => {
    if (!isDisabled) {
      try {
        toggleGeneratorMode();
        navigate(mode === "generate" ? (isAuthenticated ? "/main-page" : "/") : "/generate");
      } catch (error) {
        console.error('Error toggling mode:', error);
      }
    }
  }, [isDisabled, toggleGeneratorMode, navigate, mode, isAuthenticated]);

  const handleLogOut = useCallback(async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, [logOut]);

  const handleNavigate = useCallback((path) => {
    try {
      navigate(path);
    } catch (error) {
      console.error('Error navigating:', error);
    }
  }, [navigate]);

  const handleSidebarMouseEnter = useCallback(() => {
    if (!sidebarLocked) {
      try {
        const event = new CustomEvent('sidebarHover', { detail: { hovered: true } });
        window.dispatchEvent(event);
      } catch (error) {
        console.error('Error dispatching sidebar hover event:', error);
      }
    }
  }, [sidebarLocked]);

  const handleSidebarMouseLeave = useCallback(() => {
    if (!sidebarLocked) {
      try {
        const event = new CustomEvent('sidebarHover', { detail: { hovered: false } });
        window.dispatchEvent(event);
      } catch (error) {
        console.error('Error dispatching sidebar hover event:', error);
      }
    }
  }, [sidebarLocked]);

  if (isAuthLoading) return null;

  const modeSwitchButton = (
    <div className="relative generator-disabled">
      <button
        onClick={handleModeToggle}
        className={`mode-toggle-button flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-300 font-medium ${
          isDisabled 
            ? "opacity-50 cursor-not-allowed bg-gray-200 dark:bg-gray-700" 
            : mode === "generate" 
              ? "mode-active"
              : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
        }`}
        disabled={isDisabled}
      >
        <span className="relative">
          {mode === "generate" ? "Business Mode" : "Generator Mode"}
          {mode === "generate" && (
            <span className="absolute -right-2 -top-2">
              <span className="relative flex h-3 w-3">
                <span className="hover:animate-status-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
            </span>
          )}
        </span>
      </button>

      {isDisabled && (
        <div className="generator-tooltip">
          <div className="generator-tooltip-content">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span>Sign up or login to activate</span>
          </div>
          <div className="generator-tooltip-arrow" />
        </div>
      )}
    </div>
  );

  const authButtons = !isAuthenticated ? (
    <>
      <button
        onClick={() => handleNavigate("/login")}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-text-primary font-medium"
      >
        <span className="nav-icon"><IconKey /></span>
        {!isMobile && <span>Login</span>}
      </button>
      <button
        onClick={() => handleNavigate("/signup")}
        className="relative overflow-hidden px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all font-medium"
      >
        <span className="nav-icon relative z-10">
          <span className="button-sparkle" style={{ left: "10%", top: "30%" }} />
          <span className="button-sparkle" style={{ left: "30%", top: "10%", animationDelay: "0.4s" }} />
          <IconUserPlus />
        </span>
        {!isMobile && <span className="relative z-10">Sign Up</span>}
      </button>
    </>
  ) : (
    <button
      onClick={handleLogOut}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-text-primary font-medium"
    >
      <span className="nav-icon"><IconLogOut /></span>
      {!isMobile && <span>Logout</span>}
    </button>
  );

  return (
    <>
      {isMobile ? (
        <header className="mobile-header fixed top-0 left-0 right-0 bg-bg-secondary border-b border-divider z-50">
          <div className="flex justify-between items-center p-3">
            <div className="flex gap-2 items-center">
              {navItems}
              {modeSwitchButton}
            </div>
            <div className="flex gap-2 items-center">
              {authButtons}
            </div>
          </div>
        </header>
      ) : (
        <aside 
          className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-xl z-50 transition-transform duration-300 ${
            sidebarVisible ? 'translate-x-0' : '-translate-x-full'
          } ${mode === "generate" ? 'business-mode-navbar' : ''}`}
          onMouseEnter={handleSidebarMouseEnter}
          onMouseLeave={handleSidebarMouseLeave}
        >
          <div className="px-6 pt-8 pb-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <Link to="/" className="sidebar-logo text-2xl font-bold">
                FREELENS
              </Link>
              <div className="flex items-center space-x-2">
                {mode === "generate" && onToggleProgress && (
                  <button
                    onClick={onToggleProgress}
                    className="p-2 rounded-lg transition-all duration-200 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    title="Toggle Progress Indicator"
                  >
                    <IconEye className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={toggleSidebarLock}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    sidebarLocked
                      ? 'bg-slate-700 text-white hover:bg-slate-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                  title={sidebarLocked ? "Unlock Sidebar" : "Lock Sidebar"}
                >
                  <LockIcon isLocked={sidebarLocked} />
                </button>
              </div>
            </div>
            <div className="nav-items flex flex-col gap-2 flex-1">
              {navItems}
              {modeSwitchButton}
            </div>
            <div className="auth-section mt-auto flex flex-col gap-2">
              {authButtons}
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default Navbar;