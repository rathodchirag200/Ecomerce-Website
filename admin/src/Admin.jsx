import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "./assets/admin_assets/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const [activeMenu, setActiveMenu] = useState("add");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [isBestseller, setIsBestseller] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ Sidebar toggle state

  const navigate = useNavigate();

  // ✅ Redirect to login if admin is not logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/adlogin");
    }
  }, [navigate]);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/adlogin");
    }, 1000);
  };

  // Image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  // Toggle size
  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !file) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subCategory);
      formData.append("size", sizes.join(","));
      formData.append("bestseller", isBestseller);
      formData.append("images", file);

      const res = await axios.post(
        "https://ecomerce-website-ezue.onrender.com/product/add",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.status === 201) {
        toast.success("Product added successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setSizes([]);
        setImage(null);
        setFile(null);
        setIsBestseller(false);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product!");
    }
  };

  // Sidebar navigation
  const handleNavigation = (menu) => {
    setActiveMenu(menu);
    if (menu === "list") navigate("/products");
    if (menu === "orders") navigate("/orders");
    setIsSidebarOpen(false); // ✅ Close sidebar after navigation on mobile
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f8fa]">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md border-b px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-900">
          <img src={"logo.svg"} width="140" height="140" alt="logo" />
          <span className="text-gray-600 text-sm sm:text-lg">Admin Dashboard</span>
        </h1>

        {/* ✅ Hamburger menu for mobile */}
        <button
          className="md:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <button
          onClick={handleLogout}
          className="hidden md:block bg-pink-500 text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-pink-600 transition text-sm sm:text-base"
        >
          Logout
        </button>
      </nav>

      {/* Sidebar + Main */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <div
          className={`fixed md:static top-0 left-0 h-full md:h-auto bg-white border-r p-0 shadow-md z-40 transition-transform duration-300 ease-in-out w-64 md:w-72 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-2 text-center md:text-left">
            <img
              src={"logo.svg"}
              width="140"
              height="140"
              alt="logo"
              className="mx-auto md:mx-0"
            />
            <div className="text-pink-500 font-bold text-base sm:text-lg mt-2 mb-6">
              ADMIN PANEL
            </div>
          </div>

          <div className="space-y-2 px-4 sm:px-6 pb-4">
            <button
              onClick={() => handleNavigation("add")}
              className={`w-full p-3 rounded-lg text-left flex items-center gap-2 text-sm sm:text-base ${
                activeMenu === "add"
                  ? "bg-pink-100 text-pink-700 font-semibold border border-pink-300"
                  : "hover:bg-gray-100 border border-transparent"
              }`}
            >
              <img src={assets.add_icon} alt="add" className="w-5 h-5" />
              Add Items
            </button>

            <button
              onClick={() => handleNavigation("list")}
              className={`w-full p-3 rounded-lg text-left flex items-center gap-2 text-sm sm:text-base ${
                activeMenu === "list"
                  ? "bg-pink-100 text-pink-700 font-semibold border border-pink-300"
                  : "hover:bg-gray-100 border border-transparent"
              }`}
            >
              <img src={assets.order_icon} alt="list" className="w-5 h-5" />
              List Items
            </button>

            <button
              onClick={() => handleNavigation("orders")}
              className={`w-full p-3 rounded-lg text-left flex items-center gap-2 text-sm sm:text-base ${
                activeMenu === "orders"
                  ? "bg-pink-100 text-pink-700 font-semibold border border-pink-300"
                  : "hover:bg-gray-100 border border-transparent"
              }`}
            >
              <img src={assets.order_icon} alt="orders" className="w-5 h-5" />
              Orders
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-8 mt-4 md:mt-0">
          {activeMenu === "add" && (
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-lg p-5 sm:p-8 rounded-2xl border w-full"
            >
              {/* Image Upload */}
              <label className="block font-semibold mb-2 text-base sm:text-lg">
                Product Image
              </label>
              <div className="mb-6">
                <label className="border border-dashed border-gray-300 w-40 sm:w-48 h-40 sm:h-48 flex flex-col items-center justify-center cursor-pointer rounded-lg relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {image ? (
                    <img
                      src={image}
                      alt="preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <img
                        src={assets.upload_area}
                        alt="upload"
                        className="w-10 h-10 mb-2 opacity-60"
                      />
                      <span className="text-gray-400 text-sm sm:text-base">
                        Click to Upload
                      </span>
                    </>
                  )}
                </label>
              </div>

              {/* Name */}
              <div className="mb-5">
                <label className="block font-semibold mb-2">Product Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                  placeholder="Enter product name"
                />
              </div>

              {/* Description */}
              <div className="mb-5">
                <label className="block font-semibold mb-2">Product Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                  placeholder="Write product details..."
                />
              </div>

              {/* Category + Price */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-5 flex-wrap">
                <div>
                  <label className="block font-semibold mb-2">Product Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-3 rounded-lg w-full sm:w-48 focus:ring-2 focus:ring-pink-400 outline-none"
                  >
                    <option>Men</option>
                    <option>Women</option>
                    <option>Kids</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-2">Sub Category</label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="border p-3 rounded-lg w-full sm:w-48 focus:ring-2 focus:ring-pink-400 outline-none"
                  >
                    <option>Topwear</option>
                    <option>Bottomwear</option>
                    <option>Footwear</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-2">Product Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-3 rounded-lg w-full sm:w-32 focus:ring-2 focus:ring-pink-400 outline-none"
                    placeholder="₹"
                  />
                </div>
              </div>

              {/* Sizes */}
              <label className="block font-semibold mb-3">Available Sizes</label>
              <div className="flex gap-2 sm:gap-3 mb-6 flex-wrap">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`px-4 sm:px-5 py-2 rounded-full border transition font-semibold ${
                      sizes.includes(size)
                        ? "bg-pink-500 text-white border-pink-500"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-pink-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Bestseller */}
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  checked={isBestseller}
                  onChange={(e) => setIsBestseller(e.target.checked)}
                  className="mr-2"
                />
                <label className="font-semibold">Add to Bestseller</label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-pink-500 text-white px-6 sm:px-10 py-3 rounded-lg font-semibold hover:bg-pink-600 transition"
              >
                ADD PRODUCT
              </button>
            </form>
          )}
          <ToastContainer position="top-right" autoClose={2000} />
        </div>
      </div>
    </div>
  );
};
