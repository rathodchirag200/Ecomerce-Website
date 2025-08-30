import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);

        // Handle both cases: { user: {...} } OR { id, name, email }
        if (decoded?.user) {
          setUser(decoded.user);
        } else {
          setUser(decoded);
        }
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-semibold">{user?.name || "Guest User"}</p>
            <p className="text-gray-500 text-sm">{user?.email || "No email"}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-4">
          <button className="w-full text-left px-4 py-2 rounded-md bg-black text-white">
            Overview
          </button>
          <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100">
            My Orders
          </button>
          <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100">
            Wishlist
          </button>
          <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100">
            Settings
          </button>
        </nav>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="mt-auto border border-black text-black px-4 py-2 rounded-md hover:bg-gray-100"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Profile Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="text-3xl font-bold mt-2">5</p>
          </div>
          <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold">Wishlist</h2>
            <p className="text-3xl font-bold mt-2">2</p>
          </div>
          <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold">Member Since</h2>
            <p className="text-3xl font-bold mt-2">2025</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <div
                key={order}
                className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">Order #{1000 + order}</p>
                  <p className="text-gray-500 text-sm">Placed on Aug 10, 2025</p>
                </div>
                <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                  Delivered
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
