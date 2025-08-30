import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi"; // Menu Icon

export const Productsdata = () => {
  const [activeMenu, setActiveMenu] = useState("list");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    size: "",
    bestseller: false,
    images: null,
  });

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/product/list");
      setProducts(res.data.productdata);
    } catch (err) {
      console.error("Error fetching product data:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleNavigation = (menu) => {
    setActiveMenu(menu);
    if (menu === "add") navigate("/");
    if (menu === "orders") navigate("/orders");
    setSidebarOpen(false); // Auto close sidebar on mobile after navigating
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:3000/product/delete/${id}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price,
      category: product.category,
      subcategory: product.subcategory || "",
      size: product.size ? product.size.join(",") : "",
      bestseller: product.bestseller || false,
      images: null,
    });
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      subcategory: "",
      size: "",
      bestseller: false,
      images: null,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, images: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("subcategory", formData.subcategory);
      data.append("size", formData.size);
      data.append("bestseller", formData.bestseller);

      if (formData.images) {
        data.append("images", formData.images);
      }

      await axios.put(
        `http://localhost:3000/product/update/${editingProduct._id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product updated successfully");
      handleCloseModal();
      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f8fa]">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {/* Menu Icon for Mobile */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <img src={"logo.svg"} width={"140px"} height={"140px"} alt="logo" />
            <span className="ml-2 text-gray-600 text-lg hidden sm:inline">
              Admin Dashboard
            </span>
          </h1>
        </div>
        <button className="bg-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-600 transition">
          Logout
        </button>
      </nav>

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-64 bg-white border-r shadow-md p-0 z-40 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          <div className="px-8 pt-8 pb-2">
            <h2 className="text-4xl font-bold text-gray-900 mb-1 tracking-tight">
              <img src={"logo.svg"} width={"160px"} height={"160px"} alt="logo" />
            </h2>
            <div className="text-pink-500 font-bold text-lg mb-8">
              ADMIN PANEL
            </div>
          </div>
          <div className="space-y-2 px-4">
            <button
              onClick={() => handleNavigation("add")}
              className={`w-full p-3 rounded-lg text-left flex items-center gap-2 ${
                activeMenu === "add"
                  ? "bg-pink-100 text-pink-700 font-semibold border border-pink-300"
                  : "hover:bg-gray-100 border border-transparent"
              }`}
            >
              Add Items
            </button>
            <button
              onClick={() => handleNavigation("list")}
              className={`w-full p-3 rounded-lg text-left flex items-center gap-2 ${
                activeMenu === "list"
                  ? "bg-pink-100 text-pink-700 font-semibold border border-pink-300"
                  : "hover:bg-gray-100 border border-transparent"
              }`}
            >
              List Items
            </button>
            <button
              onClick={() => handleNavigation("orders")}
              className={`w-full p-3 rounded-lg text-left flex items-center gap-2 ${
                activeMenu === "orders"
                  ? "bg-pink-100 text-pink-700 font-semibold border border-pink-300"
                  : "hover:bg-gray-100 border border-transparent"
              }`}
            >
              Orders
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="flex-1 p-4 sm:p-6 md:p-10 overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-6">All Products List</h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={`http://localhost:3000${item.images[0]}`}
                        alt={item.name}
                        className="w-24 h-24 object-contain rounded"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">${item.price}</td>
                    <td className="px-6 py-4 space-x-3">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        &#x2716;
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Subcategory</label>
                <input
                  type="text"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">
                  Size (comma separated)
                </label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="bestseller"
                  checked={formData.bestseller}
                  onChange={handleChange}
                  id="bestseller"
                />
                <label htmlFor="bestseller" className="font-semibold">
                  Bestseller
                </label>
              </div>

              <div>
                <label className="block mb-1 font-semibold">
                  Update Image (optional)
                </label>
                <input type="file" name="images" accept="image/*" onChange={handleChange} />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
