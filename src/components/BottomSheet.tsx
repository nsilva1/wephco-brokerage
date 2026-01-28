import { type ReactNode, useEffect } from 'react'

const BottomSheet = ({isOpen, onClose, children}: { isOpen: boolean, onClose: ()=> void, children:ReactNode }) => {

    useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
  return () => { document.body.style.overflow = 'unset'; };
}, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Responsive Container */}
      <div 
        className={`fixed z-50 transition-all duration-300 ease-in-out bg-white shadow-xl
          
          bottom-0 left-0 right-0 rounded-t-2xl translate-y-0 w-full
          
          
          md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
          md:rounded-2xl md:w-125 md:max-w-[90vw]
          
          /* Visibility Logic */
          ${isOpen 
            ? 'translate-y-0 opacity-100 md:scale-100' 
            : 'translate-y-full opacity-0 md:scale-95 md:translate-y-[-40%]'
          }
        `}
      >
        {/* Mobile Handle - hidden on desktop */}
        <div className="md:hidden w-12 h-1.5 bg-stone-300 rounded-full mx-auto my-3" />
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-stone-800">Send Withdrawal Request</h3>
          <button 
            onClick={onClose}
            className="hidden md:block text-stone-400 hover:text-stone-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </>
  );
}

export { BottomSheet }