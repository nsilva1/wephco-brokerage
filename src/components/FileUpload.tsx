import React, {
	useState,
	useRef,
	type DragEvent,
	type ChangeEvent,
} from 'react';

interface FileUploadProps {
	onFilesSelected: (files: File[]) => void;
	accept?: string;
	multiple?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
	onFilesSelected,
	accept = 'image/*',
	multiple = false,
}) => {
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleContainerClick = (): void => {
		fileInputRef.current?.click();
	};

	const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const files = e.target.files;
		if (files && files.length > 0) {
			onFilesSelected(Array.from(files));
		}
		// Reset to allow re-selection of the same file
		e.target.value = '';
	};

	// Drag and Drop Handlers with specialized React DragEvent types
	const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const droppedFiles = e.dataTransfer.files;
		if (droppedFiles && droppedFiles.length > 0) {
			const filesArray = Array.from(droppedFiles);
			onFilesSelected(multiple ? filesArray : [filesArray[0]]);
		}
	};

	return (
		<div
			onClick={handleContainerClick}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			className={`
        relative flex flex-col items-center justify-center w-full max-w-2xl p-4 mt-5 
        transition-all duration-200 border-2 border-dashed rounded-2xl cursor-pointer
        ${
					isDragging
						? 'border-blue-500 bg-blue-50 scale-[1.01]'
						: 'border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400'
				}
      `}
		>
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileInputChange}
				accept={accept}
				multiple={multiple}
				className="hidden"
			/>

			<div
				className={`mb-4 transition-colors ${isDragging ? 'text-blue-500' : 'text-gray-400'}`}
			>
				<svg
					className="w-12 h-12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
					/>
				</svg>
			</div>

			<p className="text-base font-semibold text-gray-600 text-center">
				Drag & Drop or click to upload property images.
			</p>
		</div>
	);
};

export default FileUpload;
