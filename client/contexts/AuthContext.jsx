import React, { createContext, useContext, useCallback, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getAccessToken, getRefreshToken, removeTokens, saveTokens } from "../utils/TokenUtils.js";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Load user from localStorage when app starts
  const loadUser = useCallback(() => {
    setIsAuthLoading(true);
    const accessToken = getAccessToken();
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
  
    if (accessToken && storedUsername && storedEmail) {
      setUser({ username: storedUsername, email: storedEmail });
      setIsAuthenticated(true);
    } else {
      removeTokens();
      console.log("User logged out for some reason");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      setIsAuthenticated(false);
      setUser(null);
    }
    setIsAuthLoading(false);
  }, []);

  useEffect(() => {
    loadUser(); // Call loadUser without any token to use localStorage
  }, [loadUser]);

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
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    toast.info("👋 You have been logged out. See you again soon!");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setIsAuthenticated,
        isAuthenticated,
        logOut,
        loadUser, // Ensure loadUser is available if needed elsewhere
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
