import { useState, useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LeadsService } from '../../services/leadsService';
import { PropertyService } from '../../services/propertyService';
import type { ILeads, IProperty } from '../../interfaces/UserInterface';
import { toast } from 'react-toastify';
import { generateData } from '../../faker/dataGenerator';
import { LeadSchema } from '../../faker/leadsSchema';
import { PropertySchema } from '../../faker/propertySchema';
import {
	Edit2,
	Mail,
	DollarSign,
	Building2,
	RefreshCw,
	Send,
	ArrowLeft,
} from 'lucide-react';
import { typography } from '../../styles';
import { formatCompactNumber } from '../../lib/helperFunctions';

const LeadDetails = () => {
	const { id } = useParams();

	const dummyLead = generateData(LeadSchema);
	const dummyProperty = generateData(PropertySchema);

	const [lead, setLead] = useState<ILeads | null>(null);
	const [loading, setLoading] = useState(false);
	const [property, setProperty] = useState<IProperty | null>(null);
	const [edit, setEdit] = useState(false);

	const seedLeadData = () => {
		setLoading(true);
		setTimeout(() => {
			setLead(dummyLead);
			setProperty(dummyProperty);
			setLoading(false);
		}, 1000);
	};

	const sendMessage = (phoneNumber: string, leadName: string) => {
		// logic to send message to lead
		const cleanedNumber = phoneNumber.replace(/\D/g, '');

		if (!cleanedNumber) {
			toast.error('Invalid phone number');
			return;
		}

		const message = encodeURIComponent(
			`Hello ${leadName}, I am reaching out from Wephco regarding your interest in ${property?.title}.`
		);

		const whatsappUrl = `https://wa.me/${cleanedNumber}?text=${message}`;

		window.location.assign(whatsappUrl);
	};

	// const getPropertyDetails = useCallback(async (propertyId: string) => {
	//     try {
	//         const data = await PropertyService.getById(propertyId);
	//         setProperty(data);
	//     } catch (error) {
	//         toast.error("Failed to fetch property details");
	//     }
	// }, []);

	// const getLead = useCallback(async () => {
	//     if (!id) return;
	//     setLoading(true);
	//     try {
	//         const data = await LeadsService.getById(id);
	//         setLead(data);
	//         if (data?.propertyId) {
	//             await getPropertyDetails(data.propertyId);
	//         }
	//     } catch (error) {
	//         toast.error("Failed to fetch lead details");
	//     } finally {
	//         setLoading(false);
	//     }
	// }, [id]);

	useEffect(() => {
		// getLead();
		seedLeadData();
	}, []);

	if (!lead && !loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-gray-500 font-bold">Lead not found.</p>
			</div>
		);
	}

	return (
		<div>
			<div className="flex justify-between items-center my-3">
				<h2 className="font-bold text-2xl">{lead?.name}</h2>
				<Edit2
					onClick={() => setEdit(!edit)}
					className="w-6 h-6 text-gray-500 cursor-pointer"
				/>
			</div>

			<div className="bg-white w-full rounded-lg border border-gray-200 p-4 md:p-10">
				<div className="flex justify-between gap-4">
					<div className="bg-amber-100 text-sm px-2 py-0.5 rounded-lg font-semibold text-red-400">
						{lead?.status}
					</div>
					<div className="text-primary">Source: {lead?.source}</div>
				</div>
				<hr className="my-4 text-gray-300" />
				<div className="flex flex-col gap-8 items-start">
					<div className="flex items-center gap-3">
						<Mail className="w-8 h-8 text-primary" />
						<div>
							<label className="text-primary">Email</label>
							{edit ? (
								<input
									type="email"
									className="p-2 border w-full border-gray-300 rounded-lg"
									value={lead?.email}
								/>
							) : (
								<p>{lead?.email}</p>
							)}
						</div>
					</div>
					<div className="flex items-center gap-3">
						<DollarSign className="w-8 h-8 text-primary" />
						<div>
							<label className="text-primary">Budget</label>
							{edit ? (
								<input
									type="text"
									className="p-2 border w-full border-gray-300 rounded-lg"
									value={lead?.budget}
								/>
							) : (
								<p>{formatCompactNumber(lead?.budget!)}</p>
							)}
						</div>
					</div>
					<div className="flex items-center gap-3">
						<Building2 className="w-8 h-8 text-primary" />
						<div className="flex flex-col">
							<label className="text-primary">Interest</label>
							<Link
								className="cursor-pointer"
								to={`/property/${lead?.propertyId}`}
							>
								{property?.title}
							</Link>
						</div>
					</div>
				</div>
				<hr className="my-4 text-gray-300" />
				<div>
					<h3 className={`${typography.h5} font-bold`}>Actions</h3>
					<div className="flex items-center justify-center md:justify-start gap-4 mt-4">
						<button className="flex gap-2 items-center text-primary bg-amber-100 p-3 rounded-lg text-sm">
							<RefreshCw />
							Update Status
						</button>
						<button
							onClick={() => sendMessage(lead?.phone!, lead?.name!)}
							className="flex gap-2 items-center text-white bg-primary p-3 rounded-lg text-sm"
						>
							<Send />
							Send Message
						</button>
					</div>
				</div>
			</div>

			<div className="mt-5">
				<Link to="/leads" className="flex gap-1 text-gray-500">
					<ArrowLeft />
					Back to Leads
				</Link>
			</div>
		</div>
	);
};

export { LeadDetails };
