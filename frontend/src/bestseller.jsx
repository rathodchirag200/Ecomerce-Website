import { useEffect, useState } from "react";
import { products } from "./assets/forever-assets/assets/frontend_assets/assets";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Bestseller = () => {
  const [latest, setLatest] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

 
 // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

 const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/list`);
      const allproducts = res.data.productdata
     const bestsellerProducts = allproducts.filter((product) => product.bestseller === true);
    setLatest(bestsellerProducts);
    } catch (err) {
      console.error("Error fetching product data:", err);
    }
  };

  const handleProductClick = (_id) => {
    navigate(`/product/${_id}`);
    };
  

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
      {latest.map((item, index) => (
        <motion.div
          key={index}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: index * 0.1,
          }}
          viewport={{ once: true, amount: 0.2 }} // only animate once when 20% visible
          className="text-center"
          onClick={() => handleProductClick(item._id)}
        >
          <div className="overflow-hidden">
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
  );
};
