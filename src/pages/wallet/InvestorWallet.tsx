import { Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp } from 'lucide-react';


// BalanceSection Component
const BalanceSection = () => (
  <div className="flex flex-col items-center text-center">
    <h2 className="text-gray-500 text-lg mb-1">Available Balance</h2>
    <h1 className="text-5xl font-bold text-[#1E3A29] mb-8">1.25M</h1>
    
    <div className="flex space-x-8">
      <div className="flex flex-col items-center">
        <button className="w-16 h-16 bg-[#D4C6A3] rounded-full flex items-center justify-center mb-2 shadow-sm hover:bg-[#c0b291] transition-colors">
          <TrendingUp className="w-8 h-8 text-[#1E3A29]" />
        </button>
        <span className="text-[#1E3A29] font-semibold">Withdraw</span>
      </div>
      <div className="flex flex-col items-center">
        <button className="w-16 h-16 bg-[#D4C6A3] rounded-full flex items-center justify-center mb-2 shadow-sm hover:bg-[#c0b291] transition-colors">
          <Wallet className="w-8 h-8 text-[#1E3A29]" />
        </button>
        <span className="text-[#1E3A29] font-semibold">Add Funds</span>
      </div>
    </div>
  </div>
);


// RecentActivity Item Component
const ActivityItem = ({ icon: Icon, title, date, amount, type }: any) => {
  const isPositive = type === 'positive';
  const iconBg = isPositive ? 'bg-green-100' : 'bg-red-100';
  const iconColor = isPositive ? 'text-green-600' : 'text-red-600';
  const amountColor = isPositive ? 'text-green-600' : 'text-gray-900';

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div>
          <h3 className="font-bold text-[#1E3A29]">{title}</h3>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>
      </div>
      <span className={`font-bold text-lg ${amountColor}`}>
        {isPositive ? '+' : '–'} {amount}
      </span>
    </div>
  );
};

// RecentActivity List Component
const RecentActivity = () => (
  <div className="bg-gray-100 rounded-t-3xl p-6 pt-8 -mx-4 mt-4">
    <h2 className="text-2xl font-bold text-[#1E3A29] mb-6">Recent Activity</h2>
    <div className="space-y-4">
      <ActivityItem 
        icon={ArrowUpRight} 
        title="Commission" 
        date="Nov 24, 2025" 
        amount="2,500,000" 
        type="positive" 
      />
      <ActivityItem 
        icon={ArrowDownLeft} 
        title="Withdrawal" 
        date="Oct 20, 2025" 
        amount="1,000,000" 
        type="negative" 
      />
      <ActivityItem 
        icon={ArrowUpRight} 
        title="Escrow Release" 
        date="Nov 15, 2025" 
        amount="500,000" 
        type="positive" 
      />
    </div>
  </div>
);

const InvestorWallet = () => {
    return (
        <div className='flex-1 flex flex-col space-y-8'>
            <BalanceSection />
            <RecentActivity />
        </div>
    );
}

export { InvestorWallet }