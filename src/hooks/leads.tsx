import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import type { ILeads } from '../interfaces/UserInterface';
import { useAuth } from '../context/AuthContext';

export const useLeads = () => {
  const { currentUser } = useAuth();
  const [leads, setLeads] = useState<ILeads[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = useCallback(async () => {
    if (!currentUser?.uid) return;

    setLoading(true);
    try {
      const leadQuery = query(
        collection(db, 'leads'), 
        where('userId', '==', currentUser.uid), 
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(leadQuery);
      const data = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as ILeads[];
      
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid]);

  useEffect(() => {
    fetchLeads();
  }, []);

//   useEffect(() => {
//     // Prevent listener if no user is logged in
//     if (!currentUser?.uid) {
//       setLeads([]);
//       setLoading(false);
//       return;
//     }

//     setLoading(true);

//     const leadQuery = query(
//       collection(db, 'leads'), 
//       where('userId', '==', currentUser.uid), 
//       orderBy('createdAt', 'desc')
//     );

//     const unsub = onSnapshot(leadQuery, (snapshot) => {
//       const data = snapshot.docs.map(doc => ({ 
//         id: doc.id, 
//         ...doc.data() 
//       })) as ILeads[];
      
//       setLeads(data);
//       setLoading(false);
//     }, (error) => {
//       console.error("Leads Hook Error:", error);
//       setLoading(false);
//     });

//     return () => unsub();
//   }, [currentUser?.uid]); // Re-subscribe if the user ID changes

  return { leads, loading, reLoadLeads: fetchLeads };
};