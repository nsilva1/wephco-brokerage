import logo from '../assets/images/logo.png';
import { Bell } from 'lucide-react';

const Header = () => {
	return (
		<header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-stone-200 bg-white px-6">
			<div className="flex items-center gap-3">
				<img src={logo} alt="Logo" className="h-10 w-14" />
				<div>
					<h1 className="font-semibold text-stone-800">Wephco</h1>
					<p className="text-sm text-stone-500 uppercase">Global Brokerage</p>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<div className="py-2 px-3 bg-green-50 text-primary rounded-lg font-semibold">
					Agent
				</div>
				<Bell className="h-5 w-5 text-stone-500" />
			</div>
		</header>
	);
};

export { Header };
