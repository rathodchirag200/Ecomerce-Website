const express = require('express');
const router = express.Router();
const Trendzy = require("../model/server");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// TEST
router.get("/register", (req, res) => {
    res.json({ message: "Register now" });
});

// REGISTER
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await Trendzy.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashpassword = await bcrypt.hash(password, 10);
        const user = await Trendzy.create({ name, email, password: hashpassword });

        const token = jwt.sign({ id: user._id , email : user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.status(201).json({ 
            message: "User registered successfully", 
            user, 
            token 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// LOGIN
router.get("/login", (req, res) => {
    res.json({ message: "Login page" });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await Trendzy.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, user: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ 
            message: "Login successful", 
            user, 
            token 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// ADD TO CART
router.post("/addtocart", async (req, res) => {
    try {
        const { userId, productId, size } = req.body;

        if (!userId || !productId || !size) {
            return res.status(400).json({ message: "Missing fields" });
        }

        // Find the user
        const user = await Trendzy.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if product already exists in cart
        const existingItem = user.cartData.find(
            item => item.productId.toString() === productId && item.size === size
        );

        if (existingItem) {
            // If already in cart, increase quantity
            existingItem.quantity += 1;
        } else {
            // Otherwise, push new item
            user.cartData.push({ productId, size, quantity: 1 });
        }

        await user.save();

        res.status(200).json({
            message: "Product added to cart successfully",
            cart: user.cartData
        });
    } catch (err) {
        console.error("Add to Cart Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
// GET USER CART
router.get("/cart/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await Trendzy.findById(userId).populate("cartData.productId");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Always send an empty array if cart is missing
        res.status(200).json({
            message: "Cart fetched successfully",
            cart: user.cartData || []
        });
    } catch (err) {
        console.error("Fetch Cart Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});


// ✅ DELETE from Cart
// ✅ Remove Single Item from Cart
router.delete("/remove/:userId/:productId/:size", async (req, res) => {
  try {
    const { userId, productId, size } = req.params;
    console.log("🟢 Removing product:", { userId, productId, size });

    const user = await Trendzy.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const beforeCount = user.cartData.length;

    user.cartData = user.cartData.filter(
      (item) => !(item.productId.toString() === productId && item.size === size)
    );

    if (beforeCount === user.cartData.length) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await user.save();
    res.status(200).json({ message: "Item removed successfully", cart: user.cartData });
  } catch (error) {
    console.error("❌ Error removing product:", error);
    res.status(500).json({ message: "Failed to remove product" });
  }
});


// ✅ Clear Entire Cart
router.delete("/clear/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("🟢 Clearing cart for user:", userId);

    if (!userId || userId.length !== 24) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await Trendzy.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cartData = []; // Clear all items
    await user.save();

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("❌ Error clearing cart:", error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
});
// ✅ Update Quantity in Cart
router.put("/cart/update", async (req, res) => {
  try {
    const { userId, productId, size, quantity } = req.body;

    if (!userId || !productId || !size || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user
    const user = await Trendzy.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the product in cart
    const item = user.cartData.find(
      (p) => p.productId.toString() === productId && p.size === size
    );

    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update quantity
    item.quantity = quantity;
    await user.save();

    res.status(200).json({
      message: "Cart quantity updated successfully",
      cart: user.cartData,
    });
  } catch (error) {
    console.error("Update Cart Quantity Error:", error);
    res.status(500).json({ message: "Failed to update quantity" });
  }
});




module.exports = router;
