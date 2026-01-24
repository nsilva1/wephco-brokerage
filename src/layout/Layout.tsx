import React from 'react';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { Header } from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-stone-50 font-sans">
				<Sidebar />
				<main className="pb-20 lg:pb-0 lg:pl-64">
					<Header />
					<div className="p-6">{children}</div>
				</main>
				<BottomNav />
			</div>
		</ProtectedRoute>
	);
};

export { Layout };
