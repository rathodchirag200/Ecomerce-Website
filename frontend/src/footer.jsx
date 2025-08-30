import { NavLink } from "react-router-dom"

export const Footer = () => {
  return (
    <footer className="px-4 pt-[100px] pb-[30px] bg-white w-full  ">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start gap-y-10 md:gap-x-16">
        
        {/* Logo + Description */}
        <div className="flex-1">
          <img src="logo.svg" alt="Logo" className="mb-4 w-[150px]" />
          <p className="text-gray-600 text-[15px] leading-relaxed max-w-[400px] w-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis nobis quam quia molestias dolorum dicta,
            voluptate dolor officiis ab magni facere quaerat tenetur, sequi fuga.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h2 className="font-bold text-lg mb-4">COMPANY</h2>
          <ul className="space-y-2 text-gray-600 text-[15px]">
            <li><NavLink to="/" className="hover:text-black">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:text-black">About Us</NavLink></li>
            <li><NavLink to="/delivery" className="hover:text-black">Delivery</NavLink></li>
            <li><NavLink to="/privacy-policy" className="hover:text-black">Privacy Policy</NavLink></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="font-bold text-lg mb-4">GET IN TOUCH</h2>
          <ul className="space-y-2 text-gray-600 text-[15px]">
            <li>+1-212-456-7890</li>
            <li>Trendzy2005@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="pt-6 mt-10 text-center text-[15px] text-gray-500 border-t">
        © 2025 <span className="font-semibold text-black">Trendzy.com</span> – All rights reserved.
      </div>
    </footer>
  )
}
