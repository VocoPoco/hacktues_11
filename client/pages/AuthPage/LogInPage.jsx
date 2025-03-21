import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import GoBackButton from "../../components/GoBackButton/goBackButton";
import {toast} from "react-toastify";
import axios from "axios";
import {saveTokens} from "../../utils/TokenUtils.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const { mutateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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

      const { access_token, refresh_token } = response.data
      saveTokens(access_token, refresh_token);
      await mutateUser();
      navigate("/");
      toast.success("🎉 Welcome back! You're now logged in");
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
              className="w-full px-4 py-3 border border-[#616062]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c281f] focus:border-transparent placeholder-[#616062]/50"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-[#616062]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c281f] focus:border-transparent placeholder-[#616062]/50 pr-12"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#616062] hover:text-[#8c281f] font-medium text-sm transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#8c281f] text-white font-semibold rounded-xl hover:bg-[#732018] transition-all duration-300"
          >
            {isLoading ? (
              <div className="inline-flex items-center">
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                Logging In...
              </div>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="mt-6 text-sm text-[#616062]">
          <button
            className="text-[#8c281f] hover:text-[#732018] underline transition-colors"
            onClick={() => navigate('/reset-password')}
          >
            Forgot Password?
          </button>
          <p className="mt-4">
            Don't have an account?{' '}
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