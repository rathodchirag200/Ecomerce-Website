import React, { useEffect, useState } from "react";
import axios from "axios";

export const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
   const API_URL = import.meta.env.VITE_API_URL;

  const userId = localStorage.getItem("userId"); // Logged-in user

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders/user/${userId}`);
      setOrders(res.data.orders || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  if (orders.length === 0) return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 pt-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 border-b pb-6">MY ORDERS</h2>

      <div className="flex flex-col gap-6 mt-4">
        {orders.map((order) =>
          order.products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 gap-4"
            >
              {/* Left: Product Image + Details */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
                <img
                  src={`${API_URL}${product.productId.images[0]}`}
                  alt={product.productId.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded self-center sm:self-start"
                />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-base sm:text-lg">
                    {product.productId.name}
                  </h3>
                  <div className="text-black flex flex-wrap gap-2 sm:gap-3 text-sm sm:text-base">
                    <p>${product.productId.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Size: {product.size}</p>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Date: {new Date(order.createdAt).toDateString()}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Payment: {order.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Right: Status + Track button */}
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto">
                <span className="flex items-center gap-2 font-semibold text-green-600 text-sm sm:text-base">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  {order.orderStatus}
                </span>
                <button className="border px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-gray-100">
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
