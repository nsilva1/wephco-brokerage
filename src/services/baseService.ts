import { db } from '../firebase/firebaseConfig';
import {
	collection,
	addDoc,
	getDoc,
	getDocs,
	query,
	where,
	updateDoc,
	deleteDoc,
	doc,
	type DocumentData,
	serverTimestamp,
} from 'firebase/firestore';

export class BaseService<T extends DocumentData> {
	private collectionName: string;

	constructor(collectionName: string) {
		this.collectionName = collectionName;
	}

	private get collectionRef() {
		return collection(db, this.collectionName);
	}

	async create(data: T) {
		try {
			const dataWithTimestamp = {
				...data,
				createdAt: serverTimestamp(),
			};
			const docRef = await addDoc(this.collectionRef, dataWithTimestamp);
			return {
				id: docRef.id,
				...dataWithTimestamp,
			};
		} catch (error: any) {
			throw new Error(`Error creating document: ${error.message}`);
		}
	}

	async getAll(userId?: string) {
		
		try {
			if(userId){
				const q = query(this.collectionRef, where('userId', '==', userId))

				const snapshot = await getDocs(q);
				return snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			})) as (T & { id: string })[];
			} else {
				const snapshot = await getDocs(this.collectionRef);
			return snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			})) as (T & { id: string })[];
			}
			
		} catch (error: any) {
			throw new Error(
				`[${this.collectionName}] Get All Error: ${error.message}`
			);
		}
	}

	// READ SINGLE
	async getById(id: string) {
		try {
			const docRef = doc(db, this.collectionName, id);
			const snap = await getDoc(docRef);
			if (!snap.exists()) throw new Error('Document not found');
			return { ...snap.data() } as T;
		} catch (error: any) {
			throw new Error(
				`[${this.collectionName}] GetById Error: ${error.message}`
			);
		}
	}

	// UPDATE
	async update(id: string, data: Partial<T>) {
		if (!id) {
        throw new Error(`[${this.collectionName}] Update Error: Document ID is required.`);
    }

    // 2. Check: Ensure data is not undefined
    if (!data) {
        throw new Error(`[${this.collectionName}] Update Error: Update data is required.`);
    }

		try {
			const docRef = doc(db, this.collectionName, id);
			await updateDoc(docRef, data as DocumentData);
			return true;
		} catch (error: any) {
			throw new Error(
				`[${this.collectionName}] Update Error: ${error.message}`
			);
		}
	}

	// DELETE
	async delete(id: string) {
		try {
			const docRef = doc(db, this.collectionName, id);
			await deleteDoc(docRef);
			return true;
		} catch (error: any) {
			throw new Error(
				`[${this.collectionName}] Delete Error: ${error.message}`
			);
		}
	}
}
