import axios from "axios";
import { getToken } from "../context/tokenUtils";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ----------------- Admin Endpoints -----------------
export const fetchAllUsers = async () => {
  try {
    const response = await api.get("/admin/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw new Error("Failed to fetch users.");
  }
};

export const updateUserRole = async (userId, role) => {
  try {
    const response = await api.put(`/admin/users/${userId}/role`, { role });
    return response.data;
  } catch (error) {
    console.error(`Error updating role for user ${userId}:`, error.message);
    throw new Error("Failed to update user role.");
  }
};

// ----------------- Checkout Endpoints -----------------
/**
 * Creates a Stripe Checkout session.
 * @param {Object} payload - Should include:
 *   - userId: Number (or retrieve from auth context)
 *   - items: Array of objects, e.g. [{ productId, quantity }]
 */
export const createCheckoutSession = async (payload) => {
  try {
    const response = await api.post("/checkout/create-checkout-session", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    throw new Error("Failed to create checkout session.");
  }
};

export default api;
