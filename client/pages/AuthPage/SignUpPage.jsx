import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import GoBackButton from "../../components/GoBackButton/goBackButton";
import { saveTokens } from "../../utils/TokenUtils";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );
      if (response.status === 201) {
        const { access_token, refresh_token } = response.data;
        saveTokens(access_token, refresh_token);
        const userData = { username: formData.username, email: formData.email };
        localStorage.setItem("username", formData.username);
        localStorage.setItem("email", formData.email);
        setUser(userData);
        setIsAuthenticated(true);
        navigate("/");
        toast.success("Registration successful!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-bg-primary font-poppins p-4">
      <div className="flex-[0_1_33%] max-w-[360px] bg-bg-secondary rounded-xl shadow-lg p-6">
        {/* <GoBackButton className="mb-4" /> */}
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-cinzel text-text-primary mb-2 uppercase">
            Create Account
          </h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full px-3 py-2.5 text-sm border-divider border rounded-lg bg-bg-secondary placeholder:text-text-secondary text-text-primary"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-3 py-2.5 text-sm border-divider border rounded-lg bg-bg-secondary placeholder:text-text-secondary text-text-primary"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-3 py-2.5 text-sm border-divider border rounded-lg pr-12 bg-bg-secondary placeholder:text-text-secondary text-text-primary"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-text-secondary text-xs"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-3 py-2.5 text-sm border-divider border rounded-lg pr-12 bg-bg-secondary placeholder:text-text-secondary text-text-primary"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-text-secondary text-xs"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 primary rounded-lg text-sm font-medium hover:shadow-accent-primary"
          >
            {isLoading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-divider">
          <p className="text-text-secondary text-xs text-center">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-accent-secondary font-semibold underline hover:text-accent-primary transition-colors"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;