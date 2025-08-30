import React from 'react';

export const Choose = () => {
  return (
    <div className='px-4'>
      <div className="text-center py-10 px-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <h2 className="text-2xl sm:text-2xl font-light tracking-wider text-gray-700">
            <span className="font-bold text-gray-900">WHY CHOOSE US</span>
          </h2>
          <span className="h-[2px] w-12 bg-gray-600"></span>
        </div>
      </div>

      <div className='w-full flex flex-col md:flex-row h-auto md:h-[250px]'>
        <div className='w-full md:w-1/3 h-[250px] md:h-full border border-[#888] flex items-center justify-center flex-col space-y-4'>
          <h1 className='font-bold'>Quality Assurance:</h1>
          <p className='text-start w-[233px] text-[#767575]'>
            We meticulously select ond vet each product to ensure it meets our stringent quoty standards.
          </p>
        </div>
        <div className='w-full md:w-1/3 h-[250px] md:h-full border border-[#888] flex items-center justify-center flex-col space-y-4'>
          <h1 className='font-bold'>Convenience:</h1>
          <p className='text-start w-[233px] text-[#767575]'>
            With our user-friendly interface and hassle free ordering process, shopping has never been easier.
          </p>
        </div>
        <div className='w-full md:w-1/3 h-[250px] md:h-full border  border-[#888] flex items-center justify-center flex-col space-y-4'>
          <h1 className='font-bold'>Exceptional Customer Service:</h1>
          <p className='text-start w-[233px] text-[#767575]'>
            Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority
          </p>
        </div>
      </div>
    </div>
  );
};
