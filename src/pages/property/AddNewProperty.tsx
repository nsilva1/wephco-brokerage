import { useState } from 'react';
import { ArrowLeft, Building, Trash2 } from 'lucide-react';
import FileUpload from '../../components/FileUpload';
import { Link } from 'react-router-dom';

interface PreviewFile extends File {
	preview: string;
}

const AddNewProperty = () => {
	const [files, setFiles] = useState<PreviewFile[]>([]);

	const handleFiles = (newFiles: File[]): void => {
		// Map the new files to our PreviewFile interface
		const filesWithPreviews = newFiles.map((file) =>
			Object.assign(file, {
				preview: URL.createObjectURL(file),
			})
		) as PreviewFile[];

		setFiles((prev) => [...prev, ...filesWithPreviews]);
	};

	const removeFile = (indexToRemove: number): void => {
		setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
	};

	return (
		<div>
			<div className="my-4">
				<p className="font-bold text-2xl">Add New Property</p>
			</div>
			<div className="bg-white p-4 flex flex-col gap-8 rounded-lg shadow-md">
				<div>
					{/* Core Details */}
					<h3 className="text-[clamp(1.25rem,3vw,1.5rem)] font-semibold">
						Core Details
					</h3>
					<div className="flex flex-col md:flex-row md:items-center md:flex-wrap gap-4 my-3">
						<div className="flex-1">
							<label>
								Property Title<span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								className="p-2 rounded-lg w-full border mt-2"
							/>
						</div>
						<div className="flex-1">
							<label>
								Developer Name<span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								className="p-2 rounded-lg w-full border mt-2"
							/>
						</div>
						<div className="flex-1">
							<label>
								Location (City, Country)<span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								className="p-2 rounded-lg w-full border mt-2"
							/>
						</div>
					</div>

					{/* Finance */}
					<h3 className="text-[clamp(1.25rem,3vw,1.5rem)] font-semibold">
						Finance
					</h3>
					<div className="flex flex-col md:flex-row md:items-center md:flex-wrap gap-4 my-3">
						<div className="flex-1">
							<label>
								Price<span className="text-red-500">*</span>
							</label>
							<input
								type="number"
								className="p-2 rounded-lg w-full border mt-2"
							/>
						</div>
						<div className="flex-1">
							<label>
								Projected Annual Yield (%)
								<span className="text-red-500">*</span>
							</label>
							<input
								type="number"
								className="p-2 rounded-lg w-full border mt-2"
							/>
						</div>
						<div className="flex-1">
							<label>
								Status<span className="text-red-500">*</span>
							</label>
							<select className="p-2 rounded-lg w-full border mt-2">
								<option value="">-</option>
								<option value="Selling Fast">Selling Fast</option>
								<option value="Exclusive">Exclusive</option>
								<option value="New Launch">New Launch</option>
								{/* <option value="Sold Out">Sold Out</option> */}
							</select>
						</div>
					</div>

					{/* Media & Description */}
					<h3 className="text-[clamp(1.25rem,3vw,1.5rem)] font-semibold">
						Media & Description
					</h3>
					<div className="flex flex-col md:flex-row md:items-center md:flex-wrap gap-4 my-3">
						<div className="flex-1">
							<label>
								Full Description<span className="text-red-500">*</span>
							</label>
							<textarea
								className="p-2 rounded-lg w-full border mt-2"
								rows={4}
							></textarea>
						</div>
						<div className="flex-1">
							<FileUpload onFilesSelected={handleFiles} />
							{files.length > 0 && (
								<div className="mt-8 grid grid-cols-3 gap-4">
									{files.map((file, idx) => (
										<div
											key={`${file.name}-${idx}`}
											className="relative group rounded-lg overflow-hidden border border-gray-200"
										>
											<div className="flex gap-2">
												<p>{file.name}</p>
												<Trash2
													className="text-red-500 cursor-pointer"
													onClick={() => removeFile(idx)}
												/>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					{/* submit */}
					<div>
						<button className="text-white bg-primary p-3 w-full rounded-xl flex items-center justify-center gap-2 mt-4">
							<Building />
							Submit for Review (List Property)
						</button>
					</div>
				</div>
			</div>
			<div>
				<Link to="/home" className="flex gap-1 text-gray-500 mt-4">
					<ArrowLeft />
					Back to Dashboard
				</Link>
			</div>
		</div>
	);
};

export { AddNewProperty };
