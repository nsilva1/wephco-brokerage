import { useState } from 'react';
import type { ILeads } from '../../interfaces/UserInterface';
import { LeadsService } from '../../services/leadsService';
import { toast } from 'react-toastify';
import { Loader } from '../../components/Loader';
import { PlusCircle } from 'lucide-react';
import { generateData } from '../../faker/dataGenerator';
import { PropertySchema } from '../../faker/propertySchema';

const AddNewLead = () => {
	const [newLead, setNewLead] = useState<ILeads>({} as ILeads);
	const [loading, setLoading] = useState(false);

	const properties = generateData(PropertySchema, 5);

	const handleChange = (input: keyof ILeads, value: string | number) => {
		setNewLead((prev) => ({
			...prev,
			[input]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			await LeadsService.create(newLead);
			toast.success('Lead added successfully');
		} catch (error) {
			toast.error('Failed to add lead');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="my-4">
				<p className="font-bold text-2xl">Add New Client Lead</p>
			</div>
			<div className="bg-white p-4 rounded-lg shadow-md">
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
									value={newLead.name}
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
									value={newLead.email}
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
									value={newLead.phone}
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
									type="text"
									value={newLead.budget}
									onChange={(e) => handleChange('budget', e.target.value)}
									className="p-2 rounded-lg w-full border mt-2"
								/>
							</div>
							<div className="flex-1">
								<label>
									Property<span className="text-red-500">*</span>
								</label>
								<select className="p-2 rounded-lg w-full border mt-2">
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
								<select className="p-2 rounded-lg w-full border mt-2">
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
