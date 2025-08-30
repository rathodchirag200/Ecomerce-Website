import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [inputvalue, setInputvalue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const res = await fetch("https://ecomerce-website-ezue.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputvalue),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Signup Success:", data);

        localStorage.setItem("token", data.token);
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white px-4 ">
      <div className="w-full max-w-md p-6 sm:p-10 flex flex-col justify-center items-center">
        
        {/* Title */}
        <h1 className="text-center text-2xl sm:text-3xl font-serif mb-8">
          Sign Up <span className="font-normal">—</span>
        </h1>

        {/* Form */}
        <form onSubmit={handlesubmit} className="flex flex-col items-center w-full">
          <input
            type="text"
            name="name"
            placeholder="Username"
            className="w-full sm:w-[380px] h-[45px] border border-gray-400 px-4 py-3 mb-6 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            value={inputvalue.name}
            onChange={handlechange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full sm:w-[380px] h-[45px] border border-gray-400 px-4 py-3 mb-6 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            value={inputvalue.email}
            onChange={handlechange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full sm:w-[380px] h-[45px] border border-gray-400 px-4 py-3 mb-6 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            value={inputvalue.password}
            onChange={handlechange}
            required
          />

          {/* Error */}
          {error && <p className="text-red-600 mb-4">{error}</p>}

          {/* Links */}
          <div className="flex justify-between w-full sm:w-[380px] text-sm mb-8 font-semibold">
            <NavLink to="/login" className="text-gray-700 hover:underline">
              Already have an account?
            </NavLink>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-[120px] flex items-center justify-center bg-black text-white py-2 font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};
