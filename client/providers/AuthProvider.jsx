import React, { createContext, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useProfile } from "./ProfileContext";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const fetchUser = async (token) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const userData = response.data;
  userData.role = userData.role?.trim() || "USER";
  return userData;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { logoutProfile } = useProfile();
  const token = localStorage.getItem("authToken");

  const {
    data: user,
    mutate: mutateUser,
    isValidating,
  } = useSWR(token ? ["user", token] : null, () => fetchUser(token), {
    revalidateOnFocus: false,
  });

  const login = useCallback(
    async (credentials) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          credentials,
        );
        const { token: newToken, user: initialUserData } = response.data;
        localStorage.setItem("authToken", newToken);
        mutateUser();
        toast.success("🎉 Welcome back! You’re now logged in.");
        return initialUserData;
      } catch (error) {
        toast.error("🚫 Login unsuccessful! Please check your credentials.");
        throw error;
      }
    },
    [mutateUser],
  );

  const logOut = useCallback(() => {
    localStorage.removeItem("authToken");
    mutateUser(null, false);
    logoutProfile();
    toast.info("👋 You have been logged out. See you again soon!");
    navigate("/login", { replace: true });
  }, [navigate, logoutProfile, mutateUser]);

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
