import { Download } from 'lucide-react';
import { usePWAInstall } from '../context/PWAContext';

const InstallButton = () => {
  const { isInstallable, install } = usePWAInstall();

  // If the app is already installed or the browser doesn't support it, 
  // don't render the button (or render it disabled)
  if (!isInstallable) return null; 

  return (
    <button 
      onClick={install}
      className="flex items-center justify-center w-full gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
    >
      <Download size={18} />
      <span>Install App</span>
    </button>
  );
};

export { InstallButton };