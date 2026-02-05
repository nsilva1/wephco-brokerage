import { useRegisterSW } from 'virtual:pwa-register/react';
import { useEffect, useState } from 'react';
import { X, Download, RefreshCw, CheckCircle2 } from 'lucide-react';
import type { BeforeInstallPromptEvent } from '../interfaces/UserInterface';
import { useLocation } from 'react-router-dom';

const ReloadPrompt = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const location = useLocation();

  // 1. Handle Install Prompt Event
  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // 2. Auto-dismiss "Offline Ready" toast after 3 seconds
  useEffect(() => {
    if (offlineReady) {
      const timer = setTimeout(() => setOfflineReady(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [offlineReady, setOfflineReady]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
    setShowInstallPrompt(false);
  };

  // Don't show anything on auth pages
  if (['/login', '/register'].includes(location.pathname)) return null;

  // Don't render empty container
  if (!offlineReady && !needRefresh && !showInstallPrompt) return null;

  return (
    <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-sm w-full'>
      
      {/* 1. Offline Ready Toast (Auto-dismissing) */}
      {offlineReady && (
        <div className='bg-white border border-green-200 p-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300'>
          <CheckCircle2 size={20} className="text-green-500" />
          <div className='flex flex-col'>
            <span className='font-semibold text-gray-800 text-sm'>Ready for offline use</span>
          </div>
        </div>
      )}

      {/* 2. Update Prompt (High Priority) */}
      {needRefresh && (
        <div className='bg-primary text-white p-4 rounded-xl shadow-xl flex flex-col gap-3 animate-in slide-in-from-bottom-5 duration-300'>
          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-3'>
              <RefreshCw size={20} className='animate-spin' />
              <div>
                <p className='font-bold text-sm'>Update Available</p>
                <p className='text-xs text-green-100 mt-0.5'>A new version is available.</p>
              </div>
            </div>
            <button 
              onClick={() => setNeedRefresh(false)} 
              className='p-1 hover:bg-white/20 rounded-full transition-colors'
            >
              <X size={16} />
            </button>
          </div>
          <button
            onClick={() => updateServiceWorker(true)}
            className='w-full bg-white text-primary py-2 rounded-lg text-sm font-bold hover:bg-green-50 transition-colors shadow-sm'
          >
            Refresh Now
          </button>
        </div>
      )}

      {/* 3. Install Prompt (Show only if no update pending to reduce clutter) */}
      {showInstallPrompt && !needRefresh && (
        <div className='bg-primary text-white p-4 rounded-xl shadow-xl flex flex-col gap-3 animate-in slide-in-from-bottom-5 duration-300'>
          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-3'>
              <Download size={20} className="text-gray-300" />
              <div>
                <p className='font-bold text-sm'>Install App</p>
                <p className='text-xs text-gray-400 mt-0.5'>Add to Home Screen for the best experience.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowInstallPrompt(false)} 
              className='p-1 hover:bg-white/10 rounded-full transition-colors'
            >
              <X size={16} />
            </button>
          </div>
          <button
            onClick={handleInstallClick}
            className='w-full bg-white text-gray-900 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors shadow-sm'
          >
            Install
          </button>
        </div>
      )}
    </div>
  );
};

export { ReloadPrompt };