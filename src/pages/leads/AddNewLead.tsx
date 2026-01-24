import { useState, useCallback, useEffect } from 'react';
import type { ILeads, IProperty } from '../../interfaces/UserInterface';
import { LeadsService } from '../../services/leadsService';
import { toast } from 'react-toastify';
import { Loader } from '../../components/Loader';
import { PlusCircle } from 'lucide-react';
import { PropertyService } from '../../services/propertyService';

const AddNewLead = () => {
	const [newLead, setNewLead] = useState<ILeads | null>(null);
	const [properties, setProperties] = useState<IProperty[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchProperties = useCallback(async () => {
			setLoading(true)
	
			try {
				const response = await PropertyService.getAll();
				setProperties(response);
			} catch (error) {
				console.error('Error fetching properties:', error);
			} finally {
				setLoading(false)
			}
		}, []);

	const clearForm = () => {
		setNewLead(null);
	}

	const handleChange = (input: keyof ILeads, value: string | number) => {
		setNewLead((prev) => ({
			...prev,
			[input]: value,
		} as ILeads));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const leadPayload: ILeads = {
				name: newLead?.name!,
				email: newLead?.email!,
				phone: newLead?.phone!,
				budget: newLead?.budget!,
				propertyId: newLead?.propertyId!,
				source: newLead?.source!,
				status:'New Lead'
			}

			await LeadsService.create(leadPayload);
			toast.success('Lead added successfully');
			clearForm();
		} catch (error) {
			toast.error('Failed to add lead');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
			fetchProperties();
		}, []);

	return (
		<div>
			<div className="my-4">
				<p className="font-bold text-2xl">Add New Client Lead</p>
			</div>
			<div className="bg-white p-10 rounded-lg shadow-md">
				<form onSubmit={handleSubmit}>
					<fieldset disabled={loading} className="">
						<div className="flex flex-col md:flex-row gap-8 my-5">
							<div className="flex-1">
								<label>
									Full Name<span className="text-red-500">*</span>
								</label>
								<input
									required
									type="text"
									value={newLead?.name}
									onChange={(e) => handleChange('name', e.target.value)}
									className="p-2 rounded-lg w-full border mt-2"
								/>
							</div>
							<div className="flex-1">
								<label>
									Email Address<span className="text-red-500">*</span>
								</label>
								<input
									required
									type="email"
									value={newLead?.email}
									onChange={(e) => handleChange('email', e.target.value)}
									className="p-2 rounded-lg w-full border mt-2"
								/>
							</div>
							<div className="flex-1">
								<label>
									Phone Number<span className="text-red-500">*</span>
								</label>
								<input
									required
									type="text"
									value={newLead?.phone}
									onChange={(e) => handleChange('phone', e.target.value)}
									className="p-2 rounded-lg w-full border mt-2"
								/>
							</div>
						</div>
						<div className="flex flex-col md:flex-row gap-8 my-5">
							<div className="flex-1">
								<label>
									Budget<span className="text-red-500">*</span>
								</label>
								<input
									required
									type="number"
									value={newLead?.budget}
									onChange={(e) => handleChange('budget', Number(e.target.value))}
									className="p-2 rounded-lg w-full border mt-2"
								/>
							</div>
							<div className="flex-1">
								<label>
									Property<span className="text-red-500">*</span>
								</label>
								<select className="p-2 rounded-lg w-full border mt-2" value={newLead?.propertyId} onChange={(e) => handleChange('propertyId', e.target.value)}>
									<option value="">-</option>
									{properties.map((property, idx) => (
										<option key={idx} value={property.id}>
											{property.title}
										</option>
									))}
								</select>
							</div>
							<div className="flex-1">
								<label>
									Lead Source<span className="text-red-500">*</span>
								</label>
								<select className="p-2 rounded-lg w-full border mt-2" value={newLead?.source} onChange={(e) => handleChange('source', e.target.value)}>
									<option value="">-</option>
									<option value="Website">Website</option>
									<option value="Referral">Referral</option>
									<option value="Social Media">Social Media</option>
									<option value="Advertisement">Advertisement</option>
								</select>
							</div>
						</div>
						<div className="grid mt-8">
							<button className="cursor-pointer">
								{loading ? (
									<Loader />
								) : (
									<div className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg w-full justify-center">
										<PlusCircle />
										Capture Lead
									</div>
								)}
							</button>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	);
};

export { AddNewLead };
