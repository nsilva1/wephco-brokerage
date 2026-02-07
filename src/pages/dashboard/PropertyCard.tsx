const PropertyCard = ({ title, location, price, yieldVal, imgURL }: any) => (
  <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
    {/* Image Placeholder */}
    {
        imgURL ? (
            <img src={imgURL} alt={title} className="w-24 h-24" />
        ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-lg shrink-0"></div>
        )
    }
    
    <div className="flex-1">
      <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
      <p className="text-gray-500 text-xs mt-0.5">{location}</p>
      
      <div className="flex justify-between items-end mt-3">
        <p className="text-green-900 font-bold text-sm">{price}</p>
        <span className="bg-[#e8cfa0] text-[10px] font-bold px-2 py-0.5 rounded text-yellow-900">
          {yieldVal} Yield
        </span>
      </div>
    </div>
  </div>
);

export { PropertyCard }