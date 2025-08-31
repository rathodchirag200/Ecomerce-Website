import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export const Adminlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_URL2 = import.meta.env.VITE_API_URL2;

  // 🔹 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/"); // Change if your dashboard route is different
    }
    else{
        navigate("/adlogin");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      // API request for admin login
      const res = await axios.post(`${API_URL2}/api/admin/login`, {
        email,
        password,
      });

      if (res.data.success) {
        // Store token in localStorage
        localStorage.setItem("adminToken", res.data.token);

        toast.success("Login successful!");
        navigate("/"); // Redirect to dashboard
      } else {
        toast.error(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2025 Trendzy. All rights reserved.
        </p>
      </div>

      {/* Toast Notification */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};
