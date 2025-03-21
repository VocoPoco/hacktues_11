import React, { createContext, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useSWR from "swr";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const fetchUser = async (url, token) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const userData = response.data;
  userData.role = userData.role?.trim() || "USER";
  return userData;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const { data: user, mutate: mutateUser, isValidating } = useSWR(
    token ? ["user", token] : null,
    fetchUser,
    { revalidateOnFocus: false }
  );

  const login = useCallback(
    async (credentials) => {
      try {
        const response = await axios.post(  
          `${import.meta.env.VITE_API_URL}/auth/login`,
          credentials
        );
        const { access_token } = response.data;
        localStorage.setItem("authToken", access_token);
        await mutateUser();
        toast.success("🎉 Welcome back! You're now logged in.");
        navigate("/profile");
      } catch (error) {
        toast.error("🚫 Login unsuccessful! Please check your credentials.");
        throw error;
      }
    },
    [mutateUser, navigate]
  );

  const logOut = useCallback(() => {
    localStorage.removeItem("authToken");
    mutateUser(null, false);
    toast.info("👋 You have been logged out. See you again soon!");
    navigate("/login", { replace: true });
  }, [navigate, mutateUser]);

  return (
    <AuthContext.Provider
      value={{
        authToken: token,
        user,
        loading: isValidating,
        login,
        logOut,
        mutateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
