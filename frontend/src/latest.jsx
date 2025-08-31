import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Latest = () => {
  const [latest, setLatest] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/list`);
      const allProducts = res.data.productdata;
      setLatest(allProducts);
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
          key={item._id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: index * 0.1,
          }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center cursor-pointer"
          onClick={() => handleProductClick(item._id)}
        >
          <div className="overflow-hidden">
            <img
              src={`${API_URL}${item.images[0]}`}
              alt={item.name}
              className="w-full h-[200px] object-contain transition-transform duration-300 ease-in-out hover:scale-105"
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
