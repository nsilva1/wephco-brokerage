import logo from '../assets/images/logo.png';
import { Bell, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
	const { logout, userInfo } = useAuth()

	return (
		<header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-stone-200 bg-white px-6">
			<div className="flex items-center gap-3">
				<img src={logo} alt="Logo" className="h-10 w-14" />
				<div>
					<h1 className="font-semibold text-stone-800 text-sm">Wephco</h1>
					<p className="text-xs text-stone-500 uppercase">Global Brokerage</p>
				</div>
			</div>
			<div className="flex items-center gap-5">
				{
					userInfo?.role === 'Investor' ? (
						<div className="py-2 px-3 bg-amber-100 text-amber-800 rounded-lg font-semibold">
							{userInfo?.role}
						</div>
					) : (
						<div className="py-2 px-3 bg-green-50 text-primary rounded-lg font-semibold">
							{userInfo?.role}
						</div>
					)
				}
				<Bell className="h-5 w-5 text-stone-500" />
				<button onClick={logout} className='cursor-pointer hover:bg-stone-100 hover:rounded-lg p-2'>
					<LogOut className='h-5 w-5 text-black' />
				</button>
			</div>
		</header>
	);
};

export { Header };
