import React from 'react';
import { assets } from './assets/forever-assets/assets/frontend_assets/assets';

export const Hero = () => {
  return (
    <div className="px-4">
      <div className="flex flex-col sm:flex-row w-full border border-black h-full">
        
        {/* Text Section */}
        <div className="w-full md:w-1/2 h-[350px] flex flex-col justify-center items-center space-y-4 px-4">
          {/* Subheading */}
          <div className="flex items-center justify-center space-x-4 text-[18px] font-semibold text-gray-800">
            <span className="w-20 h-[2px] bg-black"></span>
            <h4>OUR BESTSELLERS</h4>
          </div>

          {/* Main Heading */}
          <h1 className="text-[32px] sm:text-[38px] md:text-[48px] text-gray-800 text-center font-serif">
            Latest Arrivals
          </h1>

          {/* CTA */}
          <div className="flex items-center justify-center space-x-4 text-[18px] font-semibold text-gray-800">
            <h4 className="p-[2px]">SHOP NOW</h4>
            <span className="w-20 h-[2px] bg-black"></span>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-[350px]">
          <img src={assets.hero_img} alt="Hero" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};
