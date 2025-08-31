import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Discription } from "../discription";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "./context/CartContext";
import axios from "axios";

export const Product = () => {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
   const API_URL = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  const { addToCart } = useCart(); // ✅ Use CartContext function

  // ✅ Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/list`);
      setLatest(res.data.productdata);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching product data:", err);
      setLoading(false);
    }
  };

  // ✅ Find selected product
  const product = latest.find((p) => p._id === id);

  // ✅ Update main image when product changes
  useEffect(() => {
    if (product && product.images?.length > 0) {
      setMainImage(`${API_URL}${product.images[0]}`);
    }
  }, [product]);

  // ✅ Handle Add to Cart
  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      toast.error("Please log in to add products to the cart");
      return;
    }

    try {
      // ✅ Use CartContext addToCart
      await addToCart(product._id, selectedSize);
      toast.success("Successfully added to cart ✅");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add product");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!product) return <div className="p-6 text-center text-lg">Product not found</div>;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-15 p-6 py-10">
        {/* Image Section */}
        <div className="w-full md:w-[400px] flex-shrink-0">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Details Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{product.name}</h1>

          {/* Ratings */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-orange-500 text-lg">★★★★☆</span>
            <span className="text-gray-600">{product.reviewsCount || 122}</span>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold mt-3">${product.price}</p>

          {/* Description */}
          <p className="mt-4 text-gray-700">{product.description}</p>

          {/* Sizes */}
          <div className="mt-5">
            <h3 className="font-medium mb-2">Select Size</h3>
            <div className="flex gap-3">
              {product.size.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-6 px-6 py-3 bg-black text-white font-medium hover:bg-gray-800"
          >
            ADD TO CART
          </button>

          {/* Extra Info */}
          <div className="mt-6 text-sm text-gray-600">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return & exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />

      {/* Product Description Section */}
      <Discription />
    </>
  );
};
