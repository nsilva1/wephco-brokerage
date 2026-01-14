import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase/firebaseConfig'
import type { IUser } from '../interfaces/UserInterface'

export const registerUser = async (userData: IUser) => {
    const { email, password, firstName, lastName, role } = userData;

    try {
    // 1. Basic Validation
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // 2. Create User in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const name = `${firstName} ${lastName}`.trim();

    // 3. Update the User's Display Name (optional but recommended)
    if (name) {
      await updateProfile(user, { displayName: name });
    }

    // 4. Create Firestore Document in the "users" collection
    // We use setDoc + doc() to ensure the Firestore ID matches the Auth UID
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      name: name ?? '',
      role: role ?? 'Agent', // Default to 'Agent' if no role provided
      commision: 0,
      activeLeads: 0,
      dealsClosed: 0,
      createdAt: serverTimestamp(),
    });

    return { uid: user.uid, success: true };

  } catch (error: any) {
    console.error("Registration Error:", error.code, error.message);
    throw error; // Re-throw to handle in the UI (e.g., showing an alert)
  }
}


export const loginUser = async (email: string, password: string) => {

  try {
    // 1. Sign in using the SDK
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // 2. The user is now logged in! 
    // The SDK automatically stores the token in the browser.
    const user = userCredential.user;

    console.log("Login successful:", user.uid);
    
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName
    };

  } catch (error: any) {
    // Firebase returns specific error codes (e.g., 'auth/invalid-credential')
    console.error("Login Error:", error.code, error.message);
    throw new Error("Invalid Email or Password");
  }
};