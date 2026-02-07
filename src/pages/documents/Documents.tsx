import React, { useRef, useState } from 'react';
import { FileText, UploadCloud } from 'lucide-react';

const Documents = () => {

    // 1. Create a reference to the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 2. State to store the selected file (for demonstration)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 3. Function to trigger the file browser window
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // 4. Function to handle the file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log("File selected:", file.name);
      // TODO: Add your Firebase storage upload logic here
    }
  };

  return (
    <div>
        <div className="flex-1 flex flex-col items-center justify-center text-center pb-20">
          <div className="w-24 h-24 bg-[#E8F5E9] rounded-full flex items-center justify-center mb-6 shadow-inner">
            <FileText className="w-10 h-10 text-[#1E3A29]" strokeWidth={1.5} />
          </div>
          
          <h2 className="text-2xl font-bold text-[#1E3A29] mb-3">Secure Vault</h2>
          
          <p className="text-gray-500 text-base max-w-70 mb-8 leading-relaxed">
            Your signed contracts and KYC documents will appear here.
          </p>

          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden" 
          />

          {/* Trigger Button */}
          <button 
            onClick={handleUploadClick}
            className="text-[#1E3A29] text-lg font-bold hover:text-[#2d573d] transition-colors flex items-center gap-2"
          >
            Upload New Document
            <UploadCloud className="w-5 h-5" />
          </button>

          {/* Feedback for selected file */}
          {selectedFile && (
             <div className="mt-4 p-2 bg-gray-100 rounded text-sm text-gray-600 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Selected: {selectedFile.name}
             </div>
          )}
        </div>
    </div>
  )
}

export { Documents }