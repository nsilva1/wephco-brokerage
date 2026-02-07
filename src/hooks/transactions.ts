import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy,
  onSnapshot, 
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'; 
import type { ITransaction } from '../interfaces/UserInterface';

export const useUserTransactions = (userId: string | undefined | null) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const transactionsRef = collection(db, 'transactions');
      
      // UPDATED QUERY:
      // 1. Filter by userId
      // 2. Sort by createdAt (newest first)
      const q = query(
        transactionsRef, 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc') 
      );

      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const results = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as ITransaction[];
          
          setTransactions(results);
          setLoading(false);
          setError(null);
        },
        (err) => {
          // This is where the "Index Required" error will appear
          console.error("Error fetching transactions:", err);
          setError(err);
          setLoading(false);
        }
      );

      return () => unsubscribe();
      
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, [userId]);

  return { transactions, loading, error };
};