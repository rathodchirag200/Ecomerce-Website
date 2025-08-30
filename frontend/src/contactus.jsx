import { assets } from "./assets/forever-assets/assets/frontend_assets/assets";

export const Contactus = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Section Heading */}
      <div className="flex items-center justify-center space-x-4 mb-10">
        <h2 className="text-xl sm:text-3xl font-light tracking-wider text-gray-700">
          <span className="font-bold text-gray-900">CONTACT US</span>
        </h2>
        <span className="h-[2px] w-12 bg-gray-600"></span>
      </div>

      {/* Image + Info Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 min-h-[60vh]">
        {/* Left Image */}
        <div className="flex justify-center items-center">
          <img
            src={assets.contact_img}
            alt="Contact"
            className="max-w-[480px] w-full h-auto"
          />
        </div>

        {/* Right Info */}
        <div className="space-y-6 text-center md:text-left">
          {/* Our Store */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Store</h3>
            <p className="text-gray-600">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
            <p className="text-gray-600 mt-2">
              Tel: (415) 555-0132 <br />
              Email: admin@forever.com
            </p>
          </div>

          {/* Careers */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Careers at Forever
            </h3>
            <p className="text-gray-600 mb-4">
              Learn more about our teams and job openings.
            </p>
            <button className="border border-gray-900 px-5 py-2 text-gray-900 hover:bg-gray-900 hover:text-white transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
