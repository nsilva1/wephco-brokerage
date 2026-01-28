import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig'
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import type { IProperty, ILeads } from '../interfaces/UserInterface'
import { useAuth } from './AuthContext';

interface IDataContext {
  properties: IProperty[];
  leads: ILeads[];
  loading: boolean;
}

const DataContext = createContext<IDataContext | undefined>(undefined);

// Custom hook for cleaner usage in components
export const useData = ():IDataContext => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const { currentUser } = useAuth()
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [leads, setLeads] = useState<ILeads[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Setup Properties Listener
    const propQuery = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
    const unsubProperties = onSnapshot(propQuery, (snapshot) => {
      const propData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as IProperty[];
      setProperties(propData);
    });

    // 2. Setup Leads Listener
    const leadQuery = query(collection(db, 'leads'), where('userId', '==', currentUser?.uid), orderBy('createdAt', 'desc'));
    const unsubLeads = onSnapshot(leadQuery, (snapshot) => {
      const leadData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as ILeads[];
      setLeads(leadData);
      setLoading(false); // Stop loading once first data batch arrives
    }, (error) => {
      console.error("Leads Listener Error:", error);
      setLoading(false);
    });

    // 3. Cleanup: Stop listening when the app/component unmounts
    return () => {
      unsubProperties();
      unsubLeads();
    };
  }, []);

  const value = { properties, leads, loading };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

