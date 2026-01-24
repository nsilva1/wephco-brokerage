import React from 'react';
import { useAuth } from '../context/AuthContext';

const KYC = () => {
	const { currentUser } = useAuth();

	return <div>KYC</div>;
};

export { KYC };
