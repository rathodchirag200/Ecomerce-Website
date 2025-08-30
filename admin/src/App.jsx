import { BrowserRouter, Routes, Route } from "react-router-dom";           
import { Admin } from "./Admin";          
import {Orders} from "./orders";
import {Productsdata} from "./productsdata";
import { Adminlogin } from "./adminlogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adlogin" element={<Adminlogin />} />
        <Route path="/" element={<Admin />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Productsdata />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
