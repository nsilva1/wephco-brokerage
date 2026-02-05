// src/context/PWAContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { BeforeInstallPromptEvent } from '../interfaces/UserInterface'; // Ensure you have this type definition

interface PWAContextType {
  isInstallable: boolean;
  install: () => Promise<void>;
}

const PWAContext = createContext<PWAContextType | null>(null);

export const PWAProvider = ({ children }: { children: React.ReactNode }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // 1. Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // 2. Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) {
      console.log("Install prompt not available");
      return;
    }

    // 3. Show the install prompt
    deferredPrompt.prompt();

    // 4. Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // 5. Clean up the prompt (it can only be used once)
    setDeferredPrompt(null);
    setIsInstallable(false);

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  };

  return (
    <PWAContext.Provider value={{ isInstallable, install }}>
      {children}
    </PWAContext.Provider>
  );
};

// Custom hook to use the function anywhere
export const usePWAInstall = () => {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('usePWAInstall must be used within a PWAProvider');
  }
  return context;
};