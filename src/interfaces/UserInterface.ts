export interface IUser {
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
    commision: number;
    activeLeads: number;
    dealsClosed: number;
    createdAt: string;
}