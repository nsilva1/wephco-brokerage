import { useState, useEffect, useMemo } from 'react';
// import { generateData } from '../../faker/dataGenerator';
// import { PropertySchema } from '../../faker/propertySchema';
import { Search } from 'lucide-react';
import { formatCompactNumber } from '../../lib/helperFunctions';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { useProperties } from '../../hooks/properties';

const Properties = () => {

	const [searchTerm, setSearchTerm] = useState<string>('');
	const [debouncedTerm, setDebouncedTerm] = useState<string>('');
	

    const { properties, loading } = useProperties()


	useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

	const filteredProperties = useMemo(() => {
        if (!debouncedTerm.trim()) return properties;

        const lowerTerm = debouncedTerm.toLowerCase();
        
        return properties.filter((property) => {
            return (
                property.title.toLowerCase().includes(lowerTerm) ||
                property.location.toLowerCase().includes(lowerTerm) ||
                property.status?.toLowerCase().includes(lowerTerm)
            );
        });
    }, [properties, debouncedTerm]);

	if(loading) {
		return <Loader label='Loading Properties' />
	}


	return (
		<div className="md:p-8 w-full mt-4">
			<div className="flex bg-white p-3 rounded-lg items-center border border-stone-200">
				<Search />
				<input
					type='text'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="ml-2 w-full outline-none focus:outline-none focus:ring-0"
					placeholder="Search name, location..."
				/>
			</div>
			<div className="flex flex-col md:flex-row md:justify-center md:flex-wrap gap-4 md:gap-10 mt-4">
                {filteredProperties.length > 0 ? (
                    filteredProperties.map((property, idx) => (
                        <div
                            key={property.id || idx}
                            className="bg-white w-full md:w-96 rounded-lg shadow-sm border border-stone-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col"
                        >
                            <div className="relative h-56 w-full">
                                <img
                                    src={property.image}
                                    alt={property.title}
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
                                            to={`/properties/${property.id}`}
                                            className="bg-black text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-black/90 inline-block"
                                        >
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full text-center py-20 text-stone-500">
                        <p className="text-xl">No properties found</p>
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="text-primary underline mt-2"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>
		</div>
	);
};

export { Properties };
