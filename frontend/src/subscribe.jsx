import React from 'react'

export const Subscribe = () => {
  return (
    <div className="px-4 w-full pt-[40px] pb-[30px]">
      <div className="flex flex-col items-center max-w-[600px] mx-auto text-center">
        <h1 className="text-[22px] md:text-[25px] font-bold p-[10px]">
          Subscribe now & get 20% off
        </h1>
        <p className="text-[16px] md:text-[17px] text-gray-500 px-2 md:px-4 pb-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, libero.
        </p>

        {/* Side-by-side input & button, always horizontal */}
        <div className="flex w-full max-w-[600px]">
          <input
            type="text"
            placeholder="Enter Your Email"
            className="flex-1 border border-black px-4 py-3 text-[16px] "
          />
          <button className="bg-black text-white px-4 py-3 whitespace-nowrap ">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  )
}
