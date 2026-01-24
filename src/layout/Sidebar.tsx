import { navItems } from '../lib/constants';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	return (
		<aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col border-r border-stone-200 bg-white p-4">
			<div className="mb-8 px-2 font-bold text-xl text-primary">
				Wephco Brokerage
			</div>
			<nav className="flex flex-col gap-2">
				{navItems.map((item, idx) => (
					<Link
						key={idx}
						to={item.path}
						className="flex items-center gap-3 rounded-lg px-3 py-2 text-stone-600 hover:bg-stone-100 hover:text-primary transition-colors"
					>
						{<item.icon />}
						<span className="font-medium">{item.label}</span>
					</Link>
				))}
			</nav>
		</aside>
	);
};

export { Sidebar };
