import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

// Create Context
const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const API_URL = "https://ecomerce-website-ezue.onrender.com/api";

  // ✅ Fetch cart data from backend
  const fetchCart = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`${API_URL}/cart/${userId}`);
      const cart = res.data.cart || [];
      setCartData(cart);
      localStorage.setItem("cartData", JSON.stringify(cart));
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // ✅ Load from localStorage instantly + fetch latest data
  useEffect(() => {
    const savedCart = localStorage.getItem("cartData");
    if (savedCart) {
      setCartData(JSON.parse(savedCart)); // Show instantly
    }
    if (userId) {
      fetchCart(); // Sync with backend in background
    } else {
      setLoading(false);
    }
  }, [userId, fetchCart]);

  // ✅ Add item to cart (Optimistic Update)
  const addToCart = async (productId, size) => {
    // 1. Update UI instantly
    setCartData((prev) => {
      const existingItem = prev.find(
        (item) => item.productId === productId && item.size === size
      );
      let updatedCart;
      if (existingItem) {
        updatedCart = prev.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prev, { productId, size, quantity: 1 }];
      }
      localStorage.setItem("cartData", JSON.stringify(updatedCart));
      return updatedCart;
    });

    // 2. Send request in background
    try {
      await axios.post(`${API_URL}/addtocart`, { userId, productId, size });
    } catch (err) {
      console.error("❌ Add to cart failed:", err);
    }
  };

  // ✅ Remove one quantity (Optimistic Update)
  const removeFromCart = async (productId, size) => {
    // 1. Update UI instantly
    setCartData((prev) => {
      const updatedCart = prev
        .map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      localStorage.setItem("cartData", JSON.stringify(updatedCart));
      return updatedCart;
    });

    // 2. Send request in background
    try {
      await axios.delete(`${API_URL}/cart/${userId}/${productId}/${size}`);
    } catch (err) {
      console.error("❌ Remove from cart failed:", err);
    }
  };

  // ✅ Delete entire product from cart
  const deleteFromCart = async (productId, size) => {
    setCartData((prev) => {
      const updatedCart = prev.filter(
        (item) => !(item.productId === productId && item.size === size)
      );
      localStorage.setItem("cartData", JSON.stringify(updatedCart));
      return updatedCart;
    });

    try {
      await axios.delete(`${API_URL}/cart/remove/${userId}/${productId}/${size}`);
    } catch (err) {
      console.error("❌ Delete from cart failed:", err);
    }
  };

  // ✅ Clear entire cart instantly
  const clearCart = async () => {
    setCartData([]);
    localStorage.removeItem("cartData");

    try {
      await axios.delete(`${API_URL}/cart/clear/${userId}`);
    } catch (err) {
      console.error("❌ Clear cart failed:", err);
    }
  };

  // ✅ Calculate total items in cart
  const cartCount = cartData.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartData,
        cartCount,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        fetchCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = () => useContext(CartContext);
