import { assets } from "./assets/forever-assets/assets/frontend_assets/assets";

export const Best = () =>{
    return(
         <div className="text-center py-10 px-4 max-w-5xl mx-auto">
      {/* Title with lines */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <h2 className="text-2xl sm:text-3xl font-light tracking-wider text-gray-700">
          <span className="font-bold text-gray-900">BEST SELLERS</span>
        </h2>
        <span className="h-[2px] w-12 bg-gray-600"></span>
      </div>

      {/* Subtext / Description */}
      <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ad pariatur dolores ea
        voluptas placeat nulla eum repudiandae deserunt libero.
      </p>
    </div>
    )
}