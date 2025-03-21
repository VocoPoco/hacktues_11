import React, { createContext, useContext, useCallback, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getAccessToken, getRefreshToken, removeTokens } from "../utils/TokenUtils.js";

 const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const logOut = useCallback(async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      });

      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout-refresh`, {}, {
        headers: { Authorization: `Bearer ${getRefreshToken()}` },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    removeTokens();
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setUser(null);
    setIsAuthenticated(false);
    toast.info("👋 You have been logged out. See you again soon!");
  },);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setIsAuthenticated,
        isAuthenticated,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
