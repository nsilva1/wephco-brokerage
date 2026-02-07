import { investorNavItems } from '../lib/constants';
import { NavLink } from 'react-router-dom';

const InvestorSidebar = () => {
	return (
		<aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col border-r border-stone-200 bg-white p-4">
			<div className="mb-8 px-2 font-bold text-xl text-primary">
				Wephco Brokerage
			</div>
			<nav className="flex flex-col gap-2">
				{investorNavItems.map((item, idx) => (
					<NavLink
						key={idx}
						to={item.path}className={({ isActive }) =>
						`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
							isActive
								? 'text-white bg-primary rounded-full p-3'
								: 'text-stone-600 hover:bg-stone-100 hover:text-primary'
						}`
					}
					
					>
						{<item.icon />}
						<span className="font-medium">{item.label}</span>
					</NavLink>
				))}
			</nav>
		</aside>
	);
};

export { InvestorSidebar };
