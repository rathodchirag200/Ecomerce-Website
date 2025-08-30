import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";
import { Footer } from "./footer.jsx";
import { Home } from "./home.jsx";
import { About } from "./about.jsx";
import { Contact } from "./contact.jsx";
import { Collection } from "./collection.jsx";
import { Login } from "./login.jsx";
import { Order } from "./order.jsx";
import { Cart } from "./cart.jsx";
import { Product } from "./product.jsx";
import { Searchbar } from "./Searchbar.jsx";
import { Signup } from "./Signup.jsx";
import { Profile } from "./profile.jsx";
import AddProduct from "./Addproduct.jsx";
import { PlaceOrder } from "./placeorder.jsx";

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0); // ✅ NEW

  return (
    <div className="max-w-[1100px] mx-auto font-inter">
      <BrowserRouter>
        {/* ✅ Pass cartCount to Navbar */}
        <Navbar setShowSearch={setShowSearch} cartCount={cartCount} />

        {showSearch && (
          <Searchbar
            onSearch={(query) => setSearchQuery(query)}
            onClose={() => setShowSearch(false)}
          />
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection" element={<Collection searchQuery={searchQuery} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={<Order />} />

          {/* ✅ Pass setCartCount to Cart */}
          <Route path="/cart" element={<Cart onCartUpdate={setCartCount} />} />

          <Route path="/product/:id" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
