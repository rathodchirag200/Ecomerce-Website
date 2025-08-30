import { assets } from "./assets/forever-assets/assets/frontend_assets/assets"

export const Policy = () => {
  return (
    <div className="flex flex-col space-y-8 md:flex-row px-4 max-w-[950px] mx-auto items-center h-full justify-between pt-[50px]  md:space-y-0 md:space-x-6">
      
      <div className="flex flex-col justify-center items-center">
        <img src={assets.exchange_icon} alt="Exchange Icon" className="w-[50px] pb-[15px]" />
        <h1 className="text-[17px] font-bold">Easy Exchange Policy</h1>
        <p className="text-center">We offer hassle free exchange policy</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <img src={assets.quality_icon} alt="Quality Icon" className="w-[50px] pb-[15px]" />
        <h1 className="text-[17px] font-bold">Quality Guarantee</h1>
        <p className="text-center">We ensure the best quality products</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <img src={assets.support_img} alt="Support Icon" className="w-[40px] pb-[15px]" />
        <h1 className="text-[17px] font-bold">24/7 Support</h1>
        <p className="text-center">Our team is here to help you anytime</p>
      </div>

    </div>
  )
}
