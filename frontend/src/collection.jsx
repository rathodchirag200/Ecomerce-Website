import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Collection = ({ searchQuery }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortOption, setSortOption] = useState("Relevant");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/list`);
      setAllProducts(res.data.productdata);
      setFilteredProducts(res.data.productdata);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubcategory = (e) => {
    const value = e.target.value;
    setSubcategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Apply search, filters, and sorting
  useEffect(() => {
    let filtered = [...allProducts];

    // Search filter
    if (searchQuery && searchQuery.trim() !== "") {
      const queryLower = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(queryLower)
      );
    }

    // Category filter
    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    // Subcategory filter
    if (subcategory.length > 0) {
      filtered = filtered.filter((item) => subcategory.includes(item.subcategory));
    }

    // Sorting
    if (sortOption === "Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, category, subcategory, sortOption, allProducts]);

  const handleProduct = (_id) => {
    navigate(`/product/${_id}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white p-4 gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 p-4">
        <h2 className="font-bold text-lg mb-4">FILTERS</h2>

        {/* Categories */}
        <div className="border p-4 mb-6">
          <h3 className="text-sm font-semibold mb-3">CATEGORIES</h3>
          {["Men", "Women", "Kids"].map((cat) => (
            <label key={cat} className="flex items-center gap-2 mb-2">
              <input type="checkbox" value={cat} onChange={toggleCategory} /> {cat}
            </label>
          ))}
        </div>

        {/* Types */}
        <div className="border p-4 mb-6">
          <h3 className="text-sm font-semibold mb-3">TYPE</h3>
          {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
            <label key={type} className="flex items-center gap-2 mb-2">
              <input type="checkbox" value={type} onChange={toggleSubcategory} /> {type}
            </label>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
          <h2 className="text-2xl font-bold mb-4 sm:mb-0">
            ALL <span className="font-normal">COLLECTIONS</span>
          </h2>
          <select
            className="border border-gray-300 p-2 rounded-md"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Relevant">Relevant</option>
            <option value="Low to High">Price: Low to High</option>
            <option value="High to Low">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No products found
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item, index) => (
              <motion.div
                key={item._id}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-center cursor-pointer"
                onClick={() => handleProduct(item._id)}
              >
                <div className="overflow-hidden  shadow-sm">
                  <img
                    src={`${API_URL}${item.images[0]}`}
                    alt={item.name}
                    className="w-full h-auto object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 text-sm sm:text-base font-medium text-gray-800">
                  {item.name}
                </h3>
                <p className="font-semibold">${item.price}</p>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
