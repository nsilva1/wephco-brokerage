import { useRegisterSW } from 'virtual:pwa-register/react';
import { useEffect, useState } from 'react';
import { X, Download, RefreshCw } from 'lucide-react';
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

  const location = useLocation()

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
    setShowInstallPrompt(false);
  };

  if (!offlineReady && !needRefresh && !showInstallPrompt) return null;

  if (['/login', '/register'].includes(location.pathname)) return null;

  return (
    <div className='fixed bottom-0 right-0 p-4 m-4 z-50 flex flex-col gap-2 max-w-md w-full md:w-auto'>
      {/* Install Prompt */}
      {showInstallPrompt && (
        <div className='bg-primary text-white p-4 rounded-xl shadow-lg flex items-center justify-between gap-4 animate-in slide-in-from-bottom-5'>
          <div className='flex items-center gap-3'>
            <Download size={20} />
            <div className='flex flex-col'>
              <span className='font-bold text-sm'>Install App</span>
              <span className='text-xs text-gray-300'>
                Add to Home Screen for better experience
              </span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={handleInstallClick}
              className='bg-white text-primary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors'
            >
              Install
            </button>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className='p-1 hover:bg-white/10 rounded-full'
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Offline Ready Toast */}
      {offlineReady && (
        <div className='bg-white border border-gray-200 p-4 rounded-xl shadow-lg flex items-center justify-between gap-4 animate-in slide-in-from-bottom-5'>
          <div className='flex flex-col'>
            <span className='font-bold text-gray-900 text-sm'>App ready to work offline</span>
          </div>
          <button onClick={close} className='p-1 hover:bg-gray-100 rounded-full text-gray-400'>
            <X size={16} />
          </button>
        </div>
      )}

      {/* New Content / Refresh Toast */}
      {needRefresh && (
        <div className='bg-primary text-white p-4 rounded-xl shadow-lg flex items-center justify-between gap-4 animate-in slide-in-from-bottom-5'>
          <div className='flex items-center gap-3'>
            <RefreshCw size={20} className='animate-spin' />
            <div className='flex flex-col'>
              <span className='font-bold text-sm'>New content available</span>
              <span className='text-xs text-gray-300'>Click on reload button to update.</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => updateServiceWorker(true)}
              className='bg-white text-primary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors'
            >
              Reload
            </button>
            <button onClick={close} className='p-1 hover:bg-white/10 rounded-full'>
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { ReloadPrompt };
