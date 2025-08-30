import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

export const PlaceOrder = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [processing, setProcessing] = useState(false);

  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const SHIPPING_FEE = 10;
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate(); // ✅ Initialize navigate

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`https://ecomerce-website-ezue.onrender.com/api/cart/${userId}`);
      const cartData = Array.isArray(res.data.cart) ? res.data.cart : [];
      setCart(cartData);

      const total = cartData.reduce(
        (acc, item) => acc + (item.productId.price || 0) * (item.quantity || 0),
        0
      );
      setSubtotal(total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

 const handlePlaceOrder = async () => {
  if (!inputValue.firstName || !inputValue.lastName || !inputValue.email || !inputValue.phone) {
    toast.error("Please fill in all required fields!");
    return;
  }
  if (!paymentMethod) {
    toast.error("Please select a payment method!");
    return;
  }
  if (cart.length === 0) {
    toast.error("Your cart is empty!");
    return;
  }

  setProcessing(true);

  try {
    const products = cart.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      size: item.size || "M",
    }));

    const shippingAddress = {
      fullName: `${inputValue.firstName} ${inputValue.lastName}`,
      address: inputValue.street,
      city: inputValue.city,
      state: inputValue.state,
      zipCode: inputValue.zipcode,
      phone: inputValue.phone,
    };

    await axios.post("https://ecomerce-website-ezue.onrender.com/orders/create", {
      userId,
      products,
      shippingAddress,
      paymentMethod,
      totalPrice: subtotal + SHIPPING_FEE,
    });

    toast.success("Order placed successfully!");

    // ✅ Now clear cart AFTER successful order
    await axios.delete(`https://ecomerce-website-ezue.onrender.com/api/clear/${userId}`);
    localStorage.removeItem("cart");
    setCart([]);

    // ✅ Reset form
    setInputValue({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: "",
    });
    setPaymentMethod("");
    navigate("/orders");

  } catch (error) {
    console.error("Error placing order:", error);
    toast.error("Failed to place order");
  } finally {
    setProcessing(false);
  }
};


  if (loading) return <p className="text-center text-gray-600 mt-10">Loading cart...</p>;

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 max-w-7xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Delivery Information */}
      <div className="w-full md:w-2/3">
        <h2 className="text-2xl font-bold mb-6">
          Delivery <span className="text-gray-600">Information</span>
        </h2>
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={inputValue.firstName}
              onChange={handleInputChange}
              placeholder="First name"
              className="border p-3 rounded-md w-full"
            />
            <input
              type="text"
              name="lastName"
              value={inputValue.lastName}
              onChange={handleInputChange}
              placeholder="Last name"
              className="border p-3 rounded-md w-full"
            />
          </div>
          <input
            type="email"
            name="email"
            value={inputValue.email}
            onChange={handleInputChange}
            placeholder="Email address"
            className="border p-3 rounded-md w-full"
          />
          <input
            type="text"
            name="street"
            value={inputValue.street}
            onChange={handleInputChange}
            placeholder="Street"
            className="border p-3 rounded-md w-full"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              value={inputValue.city}
              onChange={handleInputChange}
              placeholder="City"
              className="border p-3 rounded-md w-full"
            />
            <input
              type="text"
              name="state"
              value={inputValue.state}
              onChange={handleInputChange}
              placeholder="State"
              className="border p-3 rounded-md w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="zipcode"
              value={inputValue.zipcode}
              onChange={handleInputChange}
              placeholder="Zipcode"
              className="border p-3 rounded-md w-full"
            />
            <input
              type="text"
              name="country"
              value={inputValue.country}
              onChange={handleInputChange}
              placeholder="Country"
              className="border p-3 rounded-md w-full"
            />
          </div>
          <input
            type="text"
            name="phone"
            value={inputValue.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="border p-3 rounded-md w-full"
          />
        </form>
      </div>

      {/* Cart Totals */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Cart <span className="text-gray-600">Totals</span>
          </h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping Fee</span>
            <span className="font-semibold">${SHIPPING_FEE.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-3 mt-3">
            <span className="font-bold">Total</span>
            <span className="font-bold text-lg">${(subtotal + SHIPPING_FEE).toFixed(2)}</span>
          </div>

          {/* Payment Method */}
          <h3 className="text-lg font-semibold mt-6">Payment Method</h3>
          <div className="flex flex-col gap-3 mt-3">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "Stripe"}
                onChange={() => setPaymentMethod("Stripe")}
              />{" "}
              Stripe
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "Razorpay"}
                onChange={() => setPaymentMethod("Razorpay")}
              />{" "}
              Razorpay
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />{" "}
              Cash on Delivery
            </label>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={processing}
          className={`mt-6 ${
            processing
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          } text-white py-3 px-5 w-full rounded-md transition-all`}
        >
          {processing ? "Processing..." : "PLACE ORDER"}
        </button>
      </div>
    </div>
  );
};
