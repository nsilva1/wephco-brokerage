import React, { useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PropertyService } from '../../services/propertyService';
import type { IProperty } from '../../interfaces/UserInterface';
import { toast } from 'react-toastify';
import { PropertySchema } from '../../faker/propertySchema';
import { generateData } from '../../faker/dataGenerator';
import { ShieldCheck, Mail, ArrowLeft } from 'lucide-react';
import { formatCompactNumber } from '../../lib/helperFunctions';

const PropertyDetails = () => {
	const { id } = useParams();

	const property = generateData(PropertySchema);

	//   const [property, setProperty] = React.useState<IProperty>({} as IProperty);

	//   const getPropertyDetails = useCallback(async () => {
	//     if (!id) return;

	//     try {
	//       const data = await PropertyService.getById(id);
	//       const propertyData = data || dummyProperty;
	//       setProperty(propertyData);
	//     } catch (error) {
	//       toast.error('Failed to fetch property details.');
	//     }
	//   }, [id])

	//   useEffect(() => {
	//     getPropertyDetails()
	//   }, [])

	return (
		<div className="md:p-8 w-full mt-4">
			<div className="flex flex-col items-center gap-6">
				<h2 className="text-[clamp(1.5rem,4vw,1.875rem)] font-bold">
					{property.title}
				</h2>
				<div className="bg-white w-full rounded-lg shadow-sm border border-stone-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col">
					<div className="h-56 md:h-80 w-full">
						<img
							src={property.image}
							alt={property.id}
							className="w-full h-full object-cover rounded-t-lg"
						/>
					</div>
					<div className="mt-2 p-4 flex-1 flex flex-col justify-between">
						<div className="flex justify-between">
							<div className="py-2 px-3 bg-green-50 text-primary rounded-lg font-semibold">
								{property.status}
							</div>
							<ShieldCheck className="h-8 w-8 text-green-500" />
						</div>
						<div className="grid grid-cols-2 gap-4 mt-3">
							<div>
								<p className="text-[clamp(1rem,2vw,1.125rem)] text-gray-400">
									Price
								</p>
								<p className="font-bold text-black text-[clamp(1.25rem,3vw,1.5rem)]">
									&#8358;{formatCompactNumber(property.price)}
								</p>
							</div>
							<div>
								<p className="text-[clamp(1rem,2vw,1.125rem)] text-gray-400">
									Developer
								</p>
								<p className="font-bold text-black text-[clamp(1.25rem,3vw,1.5rem)]">
									{property.developer}
								</p>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4 mt-3">
							<div>
								<p className="text-[clamp(1rem,2vw,1.125rem)] text-gray-400">
									Location
								</p>
								<p className="font-bold text-black text-[clamp(1.25rem,3vw,1.5rem)]">
									{property.location}
								</p>
							</div>
							<div>
								<p className="text-[clamp(1rem,2vw,1.125rem)] text-gray-400">
									Yield
								</p>
								<p className="font-bold text-primary text-[clamp(1.25rem,3vw,1.5rem)]">
									{property.yield}%
								</p>
							</div>
						</div>
						<hr className="my-4 text-gray-300" />
						<div>
							<p className="font-bold text-black text-[clamp(1.25rem,3vw,1.5rem)]">
								Description
							</p>
							<p className="mt-2 text-[clamp(1rem,2vw,1.125rem)] text-stone-700">
								{property.description}
							</p>
						</div>
					</div>
				</div>

				<div>
					<button className="bg-primary text-white w-full py-2 px-4 rounded-lg cursor-pointer hover:bg-black/90 flex items-center gap-2">
						<Mail className="text-white" />
						Send Details to Client
					</button>
				</div>

				<div>
					<Link to="/properties" className="flex gap-1 text-gray-500">
						<ArrowLeft />
						Back to Properties
					</Link>
				</div>
			</div>
		</div>
	);
};

export { PropertyDetails };
