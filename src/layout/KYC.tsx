import { useAuth } from '../context/AuthContext';

const KYC = () => {
	const { currentUser } = useAuth();

	return(
		<div>
			<div>KYC</div>
			<p>Verified: {currentUser?.emailVerified}</p>
		</div>
	); 
};

export { KYC };
