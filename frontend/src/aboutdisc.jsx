import { assets } from "./assets/forever-assets/assets/frontend_assets/assets";

export const Aboutdisc = () => {
  return (
    <div className="flex flex-col md:flex-row w-full px-4  gap-6">

      <div className="w-full md:w-1/2 h-[300px] md:h-[450px]">
        <img
          src={assets.about_img}
          alt="About Forever"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-5">
        <p className="font-semibold text-[#888]">
          Forever was born out of a passion for innovation and a desire to
          revolutionize the way people shop online. Our journey began with a
          simple idea: to provide a platform where customers can easily
          discover, explore, and purchase a wide range of products from the
          comfort of their homes.
        </p>
        <p className="font-semibold text-[#888]">
          Since our inception, we've worked tirelessly to curate a diverse
          selection of high-quality products that cater to every taste and
          preference. From fashion and beauty to electronics and home
          essentials, we offer an extensive collection sourced from trusted
          brands and suppliers.
        </p>
        <span className="font-bold text-[17px]">Our Mission</span>
        <p className="font-semibold text-[#888]">
          Our mission at Forever is to empower customers with choice,
          convenience, and confidence. We're dedicated to providing a seamless
          shopping experience that exceeds expectations, from browsing and
          ordering to delivery and beyond.
        </p>
      </div>
    </div>
  );
};
