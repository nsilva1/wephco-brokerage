import { storage } from "../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const uploadPropertyImage = async (file: File): Promise<string> => {
  try {
    const uniqueFileName = `${uuidv4()}_${file.name}`;
    const storageRef = ref(storage, `properties/${uniqueFileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading property image:", error);
    throw error;
  }
};