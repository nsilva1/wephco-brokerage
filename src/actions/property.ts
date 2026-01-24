import { storage } from "../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import type { IProperty } from "../interfaces/UserInterface";

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

export const getPropertyNameById = (properties: Array<IProperty>, id: string): string | null => {
    const property = properties.find(prop => prop.id === id);
    return property ? property.title : null;
};