import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "./assets/forever-assets/assets/frontend_assets/assets";
import { useCart } from "./context/CartContext";
import { jwtDecode } from "jwt-decode";

export const Navbar = ({ setShowSearch }) => {
  const [visible, setVisible] = useState(false);
  const [firstLetter, setFirstLetter] = useState("");
  const navigate = useNavigate();
  const { cartCount } = useCart(); // ✅ Dynamic cart count

  // ✅ Decode token and show first letter of username
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.user) {
          setFirstLetter(decoded.user.charAt(0).toUpperCase());
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const handleNavigate = () => navigate("/login");
  const handleProfile = () => navigate("/profile");
  const handleCart = () => navigate("/cart");

  return (
    <>
      {/* Navbar */}
      <div className="px-4 flex items-center w-[full] h-[90px] font-medium justify-between relative border-b border-[#adadad] bg-white  ">
        {/* Logo */}
        <NavLink to="/">
          <img src="logo.svg" alt="Logo" className="w-[150px]" />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 font-semibold">
          <NavLink to="/" end>
            {({ isActive }) => (
              <li className={`${isActive ? "bg-black text-white px-3 py-1 rounded" : ""}`}>
                HOME
              </li>
            )}
          </NavLink>
          <NavLink to="/collection">
            {({ isActive }) => (
              <li className={`${isActive ? "bg-black text-white px-3 py-1 rounded" : ""}`}>
                COLLECTION
              </li>
            )}
          </NavLink>
          <NavLink to="/about">
            {({ isActive }) => (
              <li className={`${isActive ? "bg-black text-white px-3 py-1 rounded" : ""}`}>
                ABOUT
              </li>
            )}
          </NavLink>
          <NavLink to="/contact">
            {({ isActive }) => (
              <li className={`${isActive ? "bg-black text-white px-3 py-1 rounded" : ""}`}>
                CONTACT
              </li>
            )}
          </NavLink>
          <a
            href="http://localhost:5174/adlogin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-gray-100 px-3 py-1 rounded block"
          >
            ADMIN
          </a>
        </ul>

        {/* Right Section */}
        <div className="flex items-center space-x-5 relative">
          {/* Search */}
          <img
            src={assets.search_icon}
            className="w-[22px] cursor-pointer"
            alt="search"
            onClick={() => setShowSearch((prev) => !prev)}
          />

          {/* Profile */}
          <img
            src={assets.profile_icon}
            className="w-[22px] cursor-pointer"
            alt="profile"
            onClick={handleNavigate}
          />

          {/* Cart */}
          <div className="relative cursor-pointer" onClick={handleCart}>
            <img src={assets.cart_icon} className="w-[22px]" alt="cart" />
            <span className="absolute -right-2 -bottom-2 bg-black text-white text-[10px] flex items-center justify-center w-[17px] h-[17px] rounded-full">
              {cartCount || 0}
            </span>
          </div>

          {/* Menu Icon */}
          <img
            src={assets.menu_icon}
            onClick={() => setVisible(true)}
            className="w-[22px] md:hidden cursor-pointer"
            alt="menu"
          />

          {/* User First Letter */}
          {firstLetter && (
            <div
              onClick={handleProfile}
              className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold cursor-pointer transition duration-500 hover:bg-gray-800"
            >
              {firstLetter}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-40 transition-opacity duration-500 ease-in-out ${
          visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setVisible(false)}
      ></div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-full max-w-[300px] h-full bg-white shadow-2xl z-50 p-6 transform transition-transform duration-500 ease-in-out ${
          visible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Back Button */}
        <div
          className="flex items-center space-x-2 mb-6 cursor-pointer"
          onClick={() => setVisible(false)}
        >
          <span className="text-2xl">←</span>
          <span className="text-lg font-semibold">Back</span>
        </div>

        {/* Sidebar Links */}
        <ul className="flex flex-col gap-3 text-lg font-semibold">
          <NavLink to="/" onClick={() => setVisible(false)}>
            <li className="hover:bg-black hover:text-white px-3 py-2 rounded">HOME</li>
          </NavLink>
          <NavLink to="/collection" onClick={() => setVisible(false)}>
            <li className="hover:bg-black hover:text-white px-3 py-2 rounded">COLLECTION</li>
          </NavLink>
          <NavLink to="/about" onClick={() => setVisible(false)}>
            <li className="hover:bg-black hover:text-white px-3 py-2 rounded">ABOUT</li>
          </NavLink>
          <NavLink to="/contact" onClick={() => setVisible(false)}>
            <li className="hover:bg-black hover:text-white px-3 py-2 rounded">CONTACT</li>
          </NavLink>
          <a
            href="http://localhost:5174/adlogin"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setVisible(false)}
          >
            <li className="hover:bg-black hover:text-white px-3 py-2 rounded">ADMIN PANEL</li>
          </a>
        </ul>
      </div>
    </>
  );
};
