import { useAuth } from '../../context/AuthContext';
import { AgentDashboard } from './AgentDashboard';
import { InvestorDashboard } from './InvestorDashboard';


const Dashboard = () => {
	const { userInfo } = useAuth();


	return (
		<div className="font-outfit">
			{
				userInfo?.role === 'Investor' ? (<InvestorDashboard />) : (<AgentDashboard />)
			}
		</div>
	);
};

export { Dashboard };
