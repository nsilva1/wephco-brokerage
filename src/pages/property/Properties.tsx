import { useState, useCallback, useEffect } from 'react';
import { generateData } from '../../faker/dataGenerator';
import { PropertySchema } from '../../faker/propertySchema';
import { Search } from 'lucide-react';
import { formatCompactNumber } from '../../lib/helperFunctions';
import { Link } from 'react-router-dom';
import { PropertyService } from '../../services/propertyService';

const Properties = () => {
	const dummyProperties = generateData(PropertySchema, 5);
	const filteredProperties = dummyProperties;

	return (
		<div className="md:p-8 w-full mt-4">
			<div className="flex bg-white p-3 rounded-lg items-center border border-stone-200">
				<Search />
				<input
					className="ml-2 w-full outline-none focus:outline-none focus:ring-0"
					placeholder="Search name, location..."
				/>
			</div>
			<div className="flex flex-col md:flex-row md:flex-wrap gap-4 mt-4">
				{filteredProperties.map((property, idx) => (
					<div
						key={idx}
						className="bg-white w-full md:w-96 rounded-lg shadow-sm border border-stone-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col"
					>
						<div className="relative h-56 w-full">
							<img
								src={property.image}
								alt={property.id}
								className="w-full h-full object-cover rounded-t-lg"
							/>
							<span className="absolute top-3 left-3 rounded-lg bg-stone-900/80 px-3 py-2 text-xs font-medium text-white">
								{property.status}
							</span>
						</div>
						<div className="mt-2 p-4 flex-1 flex flex-col justify-between">
							<div>
								<p className="font-semibold text-[clamp(1rem,2vw,1.125rem)]">
									{property.title}
								</p>
								<p className="text-primary text-[clamp(0.75rem,1.2vw,0.875rem)]">
									{property.location}
								</p>
							</div>
							<div className="flex justify-between mt-4 items-end">
								<div>
									<p className="text-[clamp(1rem,2vw,1.125rem)] font-semibold">
										Price
									</p>
									<p className="font-bold text-primary text-[clamp(1.25rem,3vw,1.5rem)]">
										&#8358;{formatCompactNumber(property.price)}
									</p>
								</div>
								<div>
									<Link
										to={`/property/${property.id}`}
										className="bg-black text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-black/90"
									>
										Details
									</Link>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export { Properties };
