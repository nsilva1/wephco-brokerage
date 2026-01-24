import { AuthForm } from '../../components/AuthForm';

const Register = () => {
	return (
		<div className="h-screen flex flex-col items-center justify-center font-outfit overflow-y-scroll">
			<AuthForm login={false} />
		</div>
	);
};

export { Register };
