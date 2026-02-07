import { X } from 'lucide-react'

export const StatusBanner = () => (
  <div className="bg-[#1E3A29] rounded-xl p-5 text-white relative overflow-hidden shadow-md">
    <div className="absolute top-0 right-0 p-2 opacity-20">
        <div className="w-24 h-24 border-4 border-white rounded-full -mr-10 -mt-10"></div>
    </div>
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-bold text-lg flex items-center gap-2">
          Status: Verified
          <span className="bg-green-500/20 text-green-300 text-[10px] px-2 py-0.5 rounded-full border border-green-500/30">Active</span>
        </h2>
        <button className="text-white/60 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed pr-8">
        Your KYC is approved. You have full access to deal integrity features.
      </p>
    </div>
  </div>
);