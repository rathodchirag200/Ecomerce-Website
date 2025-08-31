import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Login = () => {
  const [inputvalue, setInputvalue] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
   const API_URL = import.meta.env.VITE_API_URL;

  // Handle input change
  const handlechange = (e) => {
    const { name, value } = e.target;
    setInputvalue((prevstate) => ({ ...prevstate, [name]: value }));
  };

  // Handle form submit
  const handlesubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputvalue),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("Login Success:", data);

      // Save JWT token & userId in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id); // ✅ Store userId here

      // Redirect to homepage
      navigate("/");
    } else {
      setError(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Error:", err);
    setError("Something went wrong. Try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center bg-white  px-4">
      <div className="w-full max-w-md p-8 sm:p-10 flex flex-col justify-center items-center">
        
        {/* Title */}
        <h1 className="text-center text-3xl font-serif mb-8">
          Login <span className="font-normal">—</span>
        </h1>

        {/* Form */}
        <form onSubmit={handlesubmit} className="flex flex-col items-center w-full">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full sm:w-[380px] h-[45px] border border-gray-400 px-4 py-3 mb-6 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            value={inputvalue.email}
            onChange={handlechange}
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full sm:w-[380px] h-[45px] border border-gray-400 px-4 py-3 mb-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            value={inputvalue.password}
            onChange={handlechange}
            required
          />

          {/* Links */}
          <div className="flex flex-col sm:flex-row sm:justify-between w-full sm:w-[380px] text-sm mb-8 font-semibold gap-2 sm:gap-0 text-center sm:text-left">
            <NavLink to="/forgot-password" className="text-gray-700 hover:underline">
              Forgot your password?
            </NavLink>
            <NavLink to="/signup" className="text-gray-700 hover:underline">
              Create account
            </NavLink>
          </div>

          {/* Error */}
          {error && <p className="text-red-600 mb-4">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-[120px] flex items-center justify-center bg-black text-white py-2 font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};
