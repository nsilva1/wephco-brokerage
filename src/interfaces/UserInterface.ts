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

export interface IProperty {
  id?: string;
  title: string;
  developer: string;
  location: string;
  price: number;
  yield?: number;
  status: 'available' | 'sold' | 'pending';
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
    createdAt?: string;
}