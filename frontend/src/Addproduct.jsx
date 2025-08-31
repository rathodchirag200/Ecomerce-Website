import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    size: "",
    category: "",
    subcategory: "",
    bestseller: false,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Handle image upload & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Show image preview
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image!");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("size", formData.size);
      data.append("category", formData.category);
      data.append("subcategory", formData.subcategory);
      data.append("bestseller", formData.bestseller.toString());
      data.append("images", image);

      const res = await axios.post(`${API_URL}/product/add`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 20000,
      });

      alert(res.data.message);

      // ✅ Reset form after success
      setFormData({
        name: "",
        description: "",
        price: "",
        size: "",
        category: "",
        subcategory: "",
        bestseller: false,
      });
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error uploading product:", error.response?.data || error);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Add Product</h2>

        {/* Product Name */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-3"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-3"
          required
        ></textarea>

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-3"
          required
        />

        {/* Size */}
        <input
          type="text"
          name="size"
          placeholder="Sizes (e.g. S,M,L,XL)"
          value={formData.size}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-3"
          required
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-3"
          required
        />

        {/* Subcategory */}
        <input
          type="text"
          name="subcategory"
          placeholder="Subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-3"
          required
        />

        {/* Bestseller */}
        <div className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            name="bestseller"
            checked={formData.bestseller}
            onChange={handleChange}
          />
          <label>Bestseller</label>
        </div>

        {/* Image Upload */}
        <input
          type="file"
          name="images"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 w-full rounded mb-3"
          required
        />

        {/* Image Preview */}
        {preview && (
          <div className="mb-3 flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
