const express = require("express");
const router = express.Router();
const Order = require("../model/order");
const Product = require("../model/product");
const User = require("../model/server");

// 🟢 Create a New Order
router.post("/create", async (req, res) => {
  try {
    const { userId, products, shippingAddress, paymentMethod, totalPrice } = req.body;

    // ✅ Validation
    if (!userId || !products || products.length === 0 || !shippingAddress || !totalPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const order = new Order({
      userId,
      products,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟢 Get All Orders for a Specific User
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .populate({ path: "products.productId", model: Product }) // ✅ Populate product details
      .populate({ path: "userId", model: User }); // ✅ Populate user details

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟢 Get All Orders (Admin)
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({ path: "products.productId", model: Product }) // ✅ Populate products
      .populate({ path: "userId", model: User }); // ✅ Populate user info

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟢 Update Order Status (Admin)
router.put("/update/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus, paymentStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order updated successfully", updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟢 Delete an Order
router.delete("/delete/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
