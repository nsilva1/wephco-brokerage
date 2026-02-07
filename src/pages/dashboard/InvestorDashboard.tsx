import { PropertyCard } from './PropertyCard';

const InvestorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Main Content Padding */}
      <div className="p-4 pt-6 space-y-6">
        
        {/* Portfolio Card */}
        <div className="bg-[#1e3a29] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-gray-400 text-sm mb-1">Total Portfolio Value</p>
            <h1 className="text-4xl font-bold text-[#e8cfa0] mb-6">850.2M</h1>
            
            <div className="flex justify-between items-end w-3/4">
              <div>
                <p className="text-gray-400 text-xs mb-1">Yield (YTD)</p>
                <p className="text-[#e8cfa0] font-bold text-lg flex items-center gap-1">
                  + 8.2%
                </p>
              </div>
              
              <div>
                <p className="text-gray-400 text-xs mb-1">Escrow</p>
                <p className="text-green-500 font-bold text-lg">50.0M</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div>
          <h2 className="text-xl font-bold text-black">Recommended For You</h2>
        </div>

        {/* Property List */}
        <div className="space-y-4">
          {/* Card 1 */}
          <PropertyCard 
            title="Eko Atlantic High-Rise"
            location="Victoria Island, Lagos"
            price="120,000,000"
            yieldVal="8.5%"
          />

          {/* Card 2 */}
          <PropertyCard 
            title="Banana Island Duplex"
            location="Ikoyi, Lagos"
            price="450,000,000"
            yieldVal="6.2%"
          />
        </div>
      </div>
    </div>
  )
}

export { InvestorDashboard }