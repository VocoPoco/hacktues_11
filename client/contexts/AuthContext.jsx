import React, { createContext, useContext, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useSWR from "swr";
import { getAccessToken, getRefreshToken, removeTokens, saveTokens } from "../utils/TokenUtils.js";

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const fetchUser = async () => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    removeTokens();
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const { data: user, mutate: mutateUser, isValidating } = useSWR(
    "user",
    fetchUser,
    { revalidateOnFocus: false }
  );

  const logOut = useCallback(async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${getAccessToken()}` }
      });

      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout-refresh`, {}, {
        headers: { Authorization: `Bearer ${getRefreshToken()}` }
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    removeTokens();
    await mutateUser(null, false);
    toast.info("👋 You have been logged out. See you again soon!");
    navigate("/login", { replace: true });
  }, [navigate, mutateUser]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = getRefreshToken();
            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}/auth/refresh`,
              {},
              { headers: { Authorization: `Bearer ${refreshToken}` } }
            );

            const { access_token, refresh_token } = response.data;
            saveTokens(access_token, refresh_token);
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            return axios(originalRequest);
          } catch (refreshError) {
            removeTokens();
            await mutateUser(null, false);
            navigate('/login');
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [mutateUser, navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isValidating,
        logOut,
        mutateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};