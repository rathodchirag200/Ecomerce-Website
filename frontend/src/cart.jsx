import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const Cart = ({ onCartUpdate }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const SHIPPING_FEE = 10;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Fetch Cart Items
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/cart/${userId}`);
      setCart(res.data.cart);
      if (onCartUpdate) onCartUpdate(res.data.cart.length);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to fetch cart!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Navigate to Place Order
  const handleplaceorder = () => {
    navigate("/placeorder");
  };

  // ✅ Remove Product
  const removeFromCart = async (productId, size) => {
    try {
      await axios.delete(
        `${API_URL}/api/remove/${userId}/${productId}/${size}`
      );

      const updatedCart = cart.filter(
        (item) => !(item.productId._id === productId && item.size === size)
      );

      setCart(updatedCart);
      if (onCartUpdate) onCartUpdate(updatedCart.length);
      toast.success("Item removed from cart!");
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Something went wrong!");
    }
  };

  // ✅ Update Quantity
  const updateQuantity = async (productId, size, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await axios.put(`${API_URL}/api/cart/update`, {
        userId,
        productId,
        size,
        quantity: newQuantity,
      });

      const updatedCart = cart.map((item) =>
        item.productId._id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      );
      setCart(updatedCart);
      toast.success("Quantity updated!");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity!");
    }
  };

  // ✅ Calculate Subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );

  if (loading)
    return (
      <p className="text-center text-lg font-medium mt-10">Loading cart...</p>
    );

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 p-5">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center mt-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
            alt="Empty Cart"
            className="mx-auto w-48 mb-5"
          />
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Products */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                {/* Product Info */}
                <div className="flex items-center gap-5">
                  <div className="w-24 h-24 rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={`${API_URL}${item.productId.images[0]}`}
                      alt={item.productId.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.productId.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      ${item.productId.price.toFixed(2)}
                    </p>
                    <p className="text-gray-500 text-sm">Size: {item.size}</p>
                  </div>
                </div>

                {/* Quantity & Remove */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId._id, item.size, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    readOnly
                    className="w-14 border border-gray-300 rounded-lg text-center py-1 focus:ring-1 focus:ring-black"
                  />
                  <button
                    onClick={() =>
                      updateQuantity(item.productId._id, item.size, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.productId._id, item.size)}
                    className="text-red-500 hover:text-red-700 text-xl transition"
                    title="Remove Item"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border border-gray-200 p-6 rounded-lg shadow-lg bg-gray-50">
            <h3 className="text-xl font-semibold mb-5 text-gray-800">
              Cart Totals
            </h3>
            <div className="flex justify-between mb-3 text-gray-700">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3 text-gray-700">
              <span>Shipping Fee</span>
              <span>${SHIPPING_FEE.toFixed(2)}</span>
            </div>
            <hr className="my-3 border-gray-300" />
            <div className="flex justify-between text-lg font-semibold text-gray-900">
              <span>Total</span>
              <span>${(subtotal + SHIPPING_FEE).toFixed(2)}</span>
            </div>
            <button
              onClick={handleplaceorder}
              className="w-full mt-5 bg-black text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
