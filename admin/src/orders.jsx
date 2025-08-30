import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { assets } from "./assets/admin_assets/assets";
import { FiMenu, FiX } from "react-icons/fi"; // For menu & close icons

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState("orders");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ Sidebar toggle
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/orders/all");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/orders/update/${orderId}`, {
        orderStatus: newStatus,
      });
      fetchOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleNavigation = (menu) => {
    setActiveMenu(menu);
    if (menu === "add") navigate("/");
    if (menu === "list") navigate("/products");
    if (menu === "orders") navigate("/orders");
    setIsSidebarOpen(false); // Close sidebar on mobile after clicking
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f8fa]">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md border-b px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-700 text-2xl md:hidden"
          >
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
            <img src="logo.svg" alt="logo" className="w-28 sm:w-40 h-auto" />
            <span className="ml-2 text-gray-600 text-sm sm:text-lg hidden sm:block">
              Admin Dashboard
            </span>
          </h1>
        </div>
        <button className="bg-pink-500 text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-pink-600 transition text-sm sm:text-base">
          Logout
        </button>
      </nav>

      {/* Sidebar + Content */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <div
          className={`fixed md:static top-0 left-0 h-auto bg-white border-r shadow-md p-0 min-h-screen w-64 transition-transform duration-300 z-40
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <div className="px-6 pt-6 pb-4 flex justify-between items-center">
            <img src="logo.svg" alt="logo" className="w-32 sm:w-40 h-auto" />
          </div>
          <div className="text-pink-500 font-bold text-lg mt-2 px-6">ADMIN PANEL</div>
          <div className="space-y-2 px-4 mt-4">
            <button
              onClick={() => handleNavigation("add")}
              className={`w-full p-3 rounded-lg text-left ${
                activeMenu === "add"
                  ? "bg-pink-100 text-pink-700 font-semibold border border-pink-300"
                  : "hover:bg-gray-100 border border-transparent"
              }`}
            >
              Add Items
            </button>
            <button
              onClick={() => handleNavigation("list")}
              className={`w-full p-3 rounded-lg text-left ${
                activeMenu === "list"
                  ? "bg-pink-100 text-pink-700 font-semibold border border-pink-300"
                  : "hover:bg-gray-100 border border-transparent"
              }`}
            >
              List Items
            </button>
            <button
              onClick={() => handleNavigation("orders")}
              className={`w-full p-3 rounded-lg text-left ${
                activeMenu === "orders"
                  ? "bg-pink-100 text-pink-700 font-semibold border border-pink-300"
                  : "hover:bg-gray-100 border border-transparent"
              }`}
            >
              Orders
            </button>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 md:p-10 overflow-x-auto">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            Orders
          </h1>

          {loading ? (
            <div className="text-center py-10 text-gray-500 text-sm sm:text-base">
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="text-gray-500 text-center text-base sm:text-lg">
              No orders found.
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white border rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 w-full"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-3 mb-4 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 flex items-center justify-center rounded-md">
                        <img
                          src={assets.parcel_icon}
                          alt="parcel icon"
                          className="w-6 h-6 sm:w-7 sm:h-7"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">
                          Order ID:{" "}
                          <span className="text-gray-500">
                            {order._id.slice(-6)}
                          </span>
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full self-start sm:self-center ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : order.orderStatus === "Shipped"
                          ? "bg-blue-100 text-blue-600"
                          : order.orderStatus === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="mb-3">
                    {order.products.map((product, index) => (
                      <div
                        key={index}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        • {product.productId?.name} × {product.quantity}{" "}
                        <span className="text-gray-500">({product.size})</span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div className="text-gray-500 text-xs sm:text-sm mb-4">
                      <p className="font-semibold text-gray-700 mb-1">
                        Shipping:
                      </p>
                      <p>
                        {order.shippingAddress.address},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state},{" "}
                        {order.shippingAddress.country} -{" "}
                        {order.shippingAddress.zipCode}
                      </p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mt-4 gap-3 sm:gap-0">
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-gray-800">
                        ${order.totalPrice}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {order.paymentMethod} •{" "}
                        {order.paymentStatus || "Pending"}
                      </p>
                    </div>
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border border-gray-300 px-3 py-2 rounded-lg bg-gray-50 text-gray-700 text-xs sm:text-sm shadow-sm hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
