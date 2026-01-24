export interface INewUser {
	id?: string;
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
	role: 'Agent' | 'Investor';
}

export interface IUserInfo {
	id: string;
	email: string;
	name: string;
	role: string;
	commision: number;
	activeLeads: number;
	dealsClosed: number;
	wallet: WalletInfo;
	transactions: ITransaction[];
	createdAt?: string;
}

export interface IProperty {
	id?: string;
	title: string;
	developer: string;
	location: string;
	price: number;
	yield?: number;
	status: 'Selling Fast' | 'Exclusive' | 'New Launch' | 'Sold Out';
	description: string;
	image: string;
	createdAt?: string;
}

export interface ILeads {
	id?: string;
	name: string;
	email: string;
	phone: string;
	propertyId: string;
	budget?: number;
	source: string;
	status: string;
	createdAt?: string;
}

export interface WalletInfo {
	availableBalance: number;
	escrowBalance: number;
	totalEarnings: number;
	currency: string;
}

export interface ITransaction {
	id?: string;
	userId: string;
	recipientId?: string;
	dealId?: string;
	type: "deposit" | "withdrawal" | "income" | "escrow_lock";
	amount: number;
	status: "pending" | "completed" | "failed";
	description: string;
	createdAt?: string;
}

export interface UserAgent {
	uid: string;
	name: string;
	email: string;
	role: string;
	commision: number;
	activeLeads: number;
	dealsClosed: number;
	wallet: WalletInfo;
	transactions: ITransaction[];
}