import { useState, useEffect } from 'react';
// import { db } from '../firebase/firebaseConfig';
// import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import type { ILeads } from '../interfaces/UserInterface';
import { useAuth } from '../context/AuthContext';
import { listenToLeads } from '../services/leadsService';

export const useLeads = () => {
  const { currentUser } = useAuth();
  const [leads, setLeads] = useState<ILeads[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.uid) {
      setLeads([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = listenToLeads(
      currentUser.uid,
      (data) => {
        setLeads(data);
        setLoading(false);
      },
      () => setLoading(false)
    );

    return () => unsubscribe();
  }, [currentUser?.uid]);

  // const fetchLeads = useCallback(async () => {
  //   if (!currentUser?.uid) return;

  //   setLoading(true);
  //   try {
  //     if(currentUser.uid){
  //       const leadQuery = query(
  //       collection(db, 'leads'), 
  //       where('userId', '==', currentUser.uid), 
  //       orderBy('createdAt', 'desc')
  //     );

  //     const snapshot = await getDocs(leadQuery);
  //     const data = snapshot.docs.map(doc => ({ 
  //       id: doc.id, 
  //       ...doc.data() 
  //     })) as ILeads[];
      
  //     setLeads(data);
  //     } else {
  //       console.warn('UserId is undefined')
  //     }
  //   } catch (error) {
  //     console.error("Error fetching leads:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [currentUser?.uid]);

  // useEffect(() => {
  //   fetchLeads();
  // }, []);



  return { leads, loading };
};