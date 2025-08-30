const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../model/product");

const router = express.Router();

// Set storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Store files in uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Add product route
router.post("/add", upload.single("images"), async (req, res) => {
  try {
    if (!req.body || !req.file) {
      return res.status(400).json({ message: "All fields are required & image must be uploaded" });
    }

    const { name, description, price, category, subcategory, size, bestseller } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      subcategory,
      size: size.split(","), // Convert string → array
      bestseller: bestseller === "true",
      images: ["/uploads/" + req.file.filename],
    });

    await newProduct.save();

    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
});

// Get all products route
router.get("/list", async (req, res) => {
  try {
    const productdata = await Product.find();
    res.status(200).json({ productdata });
  } catch (error) {
    console.error("Error fetching the data", error);
    res.status(500).json("Internal server error");
  }
});

// Delete product route
router.delete("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update product route
router.put("/update/:id", upload.single("images"), async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, category, subcategory, size, bestseller } = req.body;

    // Prepare update data
    const updateData = {
      name,
      description,
      price,
      category,
      subcategory,
      size: size ? size.split(",") : undefined,
      bestseller: bestseller === "true",
    };

    // Remove undefined fields from updateData (in case size is not sent)
    Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

    // If an image file is uploaded, update images array
    if (req.file) {
      updateData.images = ["/uploads/" + req.file.filename];
    }

    // Find and update product
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
