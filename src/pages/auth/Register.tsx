import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AuthForm } from '../../components/AuthForm';
import { Loader } from '../../components/Loader';

const Register = () => {
	const { currentUser, loading } = useAuth();
    const navigate = useNavigate();

	useEffect(() => {
        if (!loading && currentUser) {
            navigate('/home', { replace: true });
        }
    }, [currentUser, loading, navigate]);

	if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader /> 
            </div>
        );
    }

	return (
		<div className="h-screen flex flex-col items-center justify-center font-outfit overflow-y-scroll">
			<AuthForm login={false} />
		</div>
	);
};

export { Register };
