const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const orderrouter = require("./routes/order.routes");


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ✅ Middleware
app.use(cors({
  origin: ["https://ecomerce-website-tau.vercel.app","https://ecomerce-website-k5ym.vercel.app",],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ✅ Routes
app.use("/api", userRouter);
app.use("/product", productRouter);
app.use("/orders", orderrouter);

// ✅ Database Connection (SINGLE DB)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error(" DB Connection Error:", err));

  app.get("/", (req, res) => {
  res.send(" Backend is live!");
});


// ✅ Start Server
app.listen(port, () => {
  console.log(` Server is running on http://localhost:${port}`);
});
