import { Loader } from '../../components/Loader';
import { PlusCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { typography } from '../../styles';
import { getPropertyNameById } from '../../actions/property';
import { useProperties } from '../../hooks/properties';
import { useLeads } from '../../hooks/leads';

const Leads = () => {
	
	const { properties } = useProperties()
	const { leads, loading } = useLeads()


	return (
		<div>
			<div className="my-4 flex justify-between items-center">
				<p className="font-bold text-2xl">My Leads ({leads.length})</p>
				<Link to="/leads/new">
					<PlusCircle className="w-10 h-10 text-gray-400" />
				</Link>
			</div>
			<div>
				{loading ? (
					<Loader />
				) : leads.length === 0 ? (
					<div className="flex justify-center items-center h-screen">
						<p className="text-gray-500 text-center">
							No leads available. Click the + icon to add a new lead.
						</p>
					</div>
				) : (
					<div className="flex flex-col md:flex-row md:flex-wrap">
						{leads.map((lead) => (
							<div
								key={lead.id}
								className="bg-white px-4 py-2 rounded-lg shadow-md m-2 w-full md:w-80 cursor-pointer"
							>
								<div className="flex justify-between items-center">
									<div className="flex flex-col gap-2">
										<p className={`${typography.h4} font-bold`}>{lead.name}</p>
										<p className={`${typography.paragraph} text-primary`}>
											{getPropertyNameById(properties, lead.propertyId)}
										</p>
										<div className="flex gap-3">
											<p className="bg-yellow-50 px-2 py-0.5 text-[clamp(0.7rem,0.9vw,0.8rem)] font-medium tracking-wide rounded-md text-yellow-500">
												{lead.status}
											</p>
											<p className="bg-green-50 px-2 py-0.5 text-[clamp(0.7rem,0.9vw,0.8rem)] font-medium tracking-wide rounded-md text-primary">
												{lead.source}
											</p>
										</div>
									</div>
									<Link to={`/leads/${lead.id}`}>
										<ChevronRight className="w-5 h-5 text-gray-400 hover:w-8 hover:h-8" />
									</Link>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export { Leads };
