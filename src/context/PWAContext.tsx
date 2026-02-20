import React, { createContext, useContext, useEffect, useState } from 'react';
import type { BeforeInstallPromptEvent } from '../interfaces/UserInterface';

interface PWAContextType {
  isInstallable: boolean;
  install: () => Promise<void>;
}

const PWAContext = createContext<PWAContextType | null>(null);

export const PWAProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  

  useEffect(() => {
    // Check if currently running as PWA
    const checkStandalone = () => {
      return window.matchMedia('(display-mode: standalone)').matches || 
             (window.navigator as any).standalone === true;
    };

    setIsStandalone(checkStandalone());

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const install = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsStandalone(true);
      }
    } else {
      // iOS / Manual Fallback
      alert("To install: Tap 'Share' or 'Options' and then 'Add to Home Screen'");
    }
  };

  const isInstallable = !isStandalone;

  return (
    <PWAContext.Provider value={{ isInstallable, install }}>
      {children}
    </PWAContext.Provider>
  );
};

export const usePWAInstall = () => {
  const context = useContext(PWAContext);
  if (!context) throw new Error('usePWAInstall must be used within a PWAProvider');
  return context;
};