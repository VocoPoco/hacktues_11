import React, { createContext, useContext, useCallback, useState, useEffect, useRef } from "react";
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
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  // Validate token expiration
  const isTokenValid = useCallback((token) => {
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }, []);

  // Load user from localStorage when app starts
  const loadUser = useCallback(() => {
    setIsAuthLoading(true);
    setError(null);
    
    try {
      const accessToken = getAccessToken();
      const storedUsername = localStorage.getItem("username");
      const storedEmail = localStorage.getItem("email");
    
      if (accessToken && storedUsername && storedEmail && isTokenValid(accessToken)) {
        setUser({ username: storedUsername, email: storedEmail });
        setIsAuthenticated(true);
      } else {
        // Clear invalid tokens
        removeTokens();
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      setError('Failed to load user data');
      removeTokens();
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsAuthLoading(false);
    }
  }, [isTokenValid]);

  useEffect(() => {
    loadUser();
    
    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadUser]);

  const logOut = useCallback(async () => {
    // Abort any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    
    try {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      
      if (accessToken) {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, {
          headers: { Authorization: `Bearer ${accessToken}` },
          signal: abortControllerRef.current.signal,
          timeout: 5000, // 5 second timeout
        });
      }

      if (refreshToken) {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout-refresh`, {}, {
          headers: { Authorization: `Bearer ${refreshToken}` },
          signal: abortControllerRef.current.signal,
          timeout: 5000, // 5 second timeout
        });
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Logout error:", error);
        // Don't show error toast for logout failures
      }
    } finally {
      // Always clear local data regardless of server response
      removeTokens();
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      toast.info("👋 You have been logged out. See you again soon!");
    }
  }, []);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setIsAuthenticated,
        isAuthenticated,
        logOut,
        loadUser,
        isAuthLoading,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
