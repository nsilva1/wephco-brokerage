import { Home, Users, Building, Wallet, BriefcaseBusiness } from 'lucide-react';
import {
  HiChartPie,
  HiSearch,
  HiOfficeBuilding,
  HiDocumentText,
} from 'react-icons/hi'; 

export const NAIRA_SYMBOL = '₦';

export const navItems = [
	{ label: 'Home', icon: Home, path: '/home' },
	{ label: 'Leads', icon: Users, path: '/leads' },
	{ label: 'Properties', icon: Building, path: '/properties' },
	{ label: 'Wallet', icon: Wallet, path: '/wallet' },
	{
		label: 'Learning Center',
		icon: BriefcaseBusiness,
		path: '/learning-center',
	},
];

export const investorNavItems = [
    { path: '/home', icon: HiChartPie, label: 'Dashboard' },
    { path: '/search', icon: HiSearch, label: 'Search' },
    { path: '/assets', icon: HiOfficeBuilding, label: 'My Assets' },
    { path: '/documents', icon: HiDocumentText, label: 'Documents' },
    { path: '/wallet', icon: Wallet, label: 'Wallet' },
];
