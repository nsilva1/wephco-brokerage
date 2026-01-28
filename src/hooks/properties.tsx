import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import type { IProperty } from '../interfaces/UserInterface';

export const useProperties = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const propQuery = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(propQuery);
      
      const data = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as IProperty[];
      
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, []);

//   useEffect(() => {
//     const propQuery = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
    
//     const unsub = onSnapshot(propQuery, (snapshot) => {
//       const data = snapshot.docs.map(doc => ({ 
//         id: doc.id, 
//         ...doc.data() 
//       })) as IProperty[];
      
//       setProperties(data);
//       setLoading(false);
//     });

//     return () => unsub();
//   }, []);

  return { properties, loading, reLoadProperties: fetchProperties };
};