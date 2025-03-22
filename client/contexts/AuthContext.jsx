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
  const loadUser = useCallback(async (token) => {
    setIsAuthLoading(true);
    const authToken = token || localStorage.getItem("authToken");

    if (!authToken) {
      setIsAuthenticated(false);
      setUser(null);
      setIsAuthLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUser(response.data);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(response.data)); // Store user in localStorage
    } catch (error) {
      console.error("Failed to load user:", error);
      // Attempt to refresh the token if accessToken is invalid
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });

          const { access_token, refresh_token } = refreshResponse.data;
          saveTokens(access_token, refresh_token);

          // Retry fetching user data after refreshing the token
          const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${access_token}` },
          });

          setUser(userResponse.data);
          setIsAuthenticated(true);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          logOut();
        }
      } else {
        logOut();
      }
    } finally {
      setIsAuthLoading(false);
    }
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
