import { BaseService } from './baseService';
import type { ILeads } from '../interfaces/UserInterface';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

export const LeadsService = new BaseService<ILeads>('leads');

export const listenToLeads = (
  userId: string,
  callback: (leads: ILeads[]) => void,
  onError?: (error: Error) => void
) => {
  const q = query(
    collection(db, 'leads'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const leads = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as ILeads[];

      callback(leads);
    },
    (error) => {
      console.error('[LeadsListener]', error);
      onError?.(error);
    }
  );
};
