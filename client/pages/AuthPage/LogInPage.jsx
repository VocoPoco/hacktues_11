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
    <div className="min-h-screen flex justify-center items-center bg-bg-primary font-poppins p-4">
      <div className="flex-[0_1_40%] max-w-[400px] bg-bg-secondary rounded-xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-cinzel text-text-primary mb-3 uppercase tracking-wide">
            LOG IN
          </h1>
          <p className="text-text-secondary text-base">
            Welcome back! Please log in.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 text-base border-divider border-2 rounded-xl bg-bg-secondary placeholder:text-text-secondary text-text-primary focus:ring-2 focus:ring-accent-primary"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 text-base border-divider border-2 rounded-xl pr-12 bg-bg-secondary placeholder:text-text-secondary text-text-primary focus:ring-2 focus:ring-accent-primary"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right top-3.5 text-text-secondary text-sm hover:text-accent-primary transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 primary rounded-xl text-base font-semibold hover:shadow-lg hover:shadow-accent-primary/30 transition-all"
          >
            {isLoading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-divider">
          <div className="text-center space-y-3">
            <p className="text-text-secondary text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-accent-secondary font-bold underline hover:text-accent-primary transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;