import { useAuth } from '../../context/AuthContext';
import { PlusCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { generateData } from '../../faker/dataGenerator';
import { LeadSchema } from '../../faker/leadsSchema';
import {
	getRelativeTime,
	formatCompactNumber,
} from '../../lib/helperFunctions';

const Home = () => {
	const { currentUser, userInfo } = useAuth();

	const navigate = useNavigate();

	const dummyLeads = generateData(LeadSchema, 3);

	return (
		<div className="font-outfit">
			<div>
				<p className="font-bold text-2xl">Hello, {currentUser?.displayName}</p>
			</div>

			{/* Profile section */}
			<div className="md:p-8 w-full my-10">
				<div className="flex gap-[2vw] w-full">
					<div className="flex-1 min-w-0 bg-white p-4 rounded-lg shadow-md cursor-pointer text-primary hover:bg-primary hover:text-white transition-colors flex flex-col justify-center">
						<p className="text-[clamp(0.75rem,1.5vw,1.25rem)] whitespace-nowrap">
							Commision
						</p>
						<p className="font-semibold text-[clamp(1rem,2vw,1.75rem)] truncate">
							&#8358;{userInfo?.commision ?? 0}
						</p>
					</div>
					<div className="flex-1 min-w-0 bg-white p-4 rounded-lg shadow-md cursor-pointer text-primary hover:bg-primary hover:text-white transition-colors flex flex-col justify-center">
						<p className="text-[clamp(0.75rem,1.5vw,1.25rem)] whitespace-nowrap">
							Active Leads
						</p>
						<p className="font-semibold text-[clamp(1rem,2vw,1.75rem)] truncate">
							{userInfo?.activeLeads ?? 0}
						</p>
					</div>
					<div className="flex-1 min-w-0 bg-white p-4 rounded-lg shadow-md cursor-pointer text-primary hover:bg-primary hover:text-white transition-colors flex flex-col justify-center">
						<p className="text-[clamp(0.75rem,1.5vw,1.25rem)] whitespace-nowrap">
							Deals Closed
						</p>
						<p className="font-semibold text-[clamp(1rem,2vw,1.75rem)] truncate">
							{userInfo?.dealsClosed ?? 0}
						</p>
					</div>
				</div>
			</div>

			{/* CTA Buttons */}
			<div className="md:p-8 w-full my-10">
				<div className="flex gap-[2vw] w-full">
					<button
						onClick={() => navigate('/properties')}
						className="bg-black text-white py-2 px-4 rounded-lg flex-1 cursor-pointer text-[clamp(0.75rem,1.5vw,1.25rem)]"
					>
						Find Property
					</button>
					<button
						onClick={() => navigate('/property/new')}
						className="bg-white text-primary py-2 px-4 rounded-lg flex-1 cursor-pointer text-[clamp(0.75rem,1.5vw,1.25rem)] flex gap-3 justify-center items-center border"
					>
						<PlusCircle className="w-5 h-5" /> Add Property
					</button>
				</div>
			</div>

			{/* Active Leads */}
			<div className="md:p-8 w-full my-10">
				<div className="flex justify-between">
					<p className="font-bold text-[clamp(1.25rem,4vw,1.875rem)] leading-tight">
						Active Pipeline
					</p>
					<Link
						to="/leads"
						className="text-primary font-semibold text-[clamp(0.875rem,1.5vw,1rem)]"
					>
						View All
					</Link>
				</div>
				<div className="mt-4 flex flex-col gap-4">
					{dummyLeads.map((lead, idx) => (
						<div
							key={idx}
							className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-stone-100 flex justify-between items-start md:items-center gap-2 hover:shadow-md transition-shadow cursor-pointer"
						>
							<div>
								<p className="font-semibold text-[clamp(1rem,2vw,1.125rem)]">
									{lead.name}
								</p>
								<p className="text-primary text-[clamp(0.75rem,1.2vw,0.875rem)] font-medium">
									{getRelativeTime(lead.createdAt!)}{' '}
									<span className="text-stone-300 mx-1">•</span> {lead.status}
								</p>
							</div>
							<div className="mt-2 md:mt-0">
								<p className="font-bold text-[clamp(1.25rem,3vw,1.5rem)] text-stone-900">
									&#8358;{formatCompactNumber(lead.budget!)}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export { Home };
