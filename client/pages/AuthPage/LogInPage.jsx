import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import GoBackButton from "../../components/GoBackButton/goBackButton";
import { saveTokens } from "../../utils/TokenUtils";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );
      if (response.status === 200) {
        const { access_token, refresh_token, username } = response.data;
        saveTokens(access_token, refresh_token);
        const userData = { username, email: formData.email };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("username", username);
        localStorage.setItem("email", formData.email);
        navigate("/");
        toast.success("🎉 Welcome back! You're now logged in");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#fffbf9] font-poppins p-5 relative">
      <GoBackButton />
      <div className="w-full max-w-[450px] bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <h1 className="text-3xl font-cinzel text-[#232323] mb-4 uppercase tracking-wide">LOG IN</h1>
        <p className="text-[#616062] text-sm mb-8">Welcome back! Please log in.</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border rounded-lg"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg pr-12"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#8c281f] text-white rounded-xl hover:bg-[#732018] transition-all"
          >
            {isLoading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <div className="mt-6 text-sm text-[#616062]">
          <p className="mt-4">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-[#232323] font-semibold underline hover:text-[#8c281f] transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
