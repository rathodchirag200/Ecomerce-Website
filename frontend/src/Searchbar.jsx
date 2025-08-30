import React from "react";
import { assets } from "./assets/forever-assets/assets/frontend_assets/assets";

export const Searchbar = ({ onSearch, onClose }) => {
  return (
    <div className="bg-[#f9fafb] h-[90px] border-y border-gray-400 flex items-center justify-center px-4">
      <div className="flex space-x-4 items-center justify-center relative px-4">
        <input
          placeholder="Search..."
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          className="border border-black w-[270px] h-[40px] rounded-3xl px-4"
        />
        <img
          src={assets.cross_icon}
          className="w-[15px] h-[15px] cursor-pointer"
          alt="close"
          onClick={onClose}
        />
        <img
          src={assets.search_icon}
          alt="search"
          className="w-[17px] h-[17px] absolute right-20 cursor-pointer"
        />
      </div>
    </div>
  );
};
