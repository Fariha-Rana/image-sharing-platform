import { storage } from "./config";
import { ID } from "appwrite";


class ImageStorage {
  async uploadImage(file) {
    try {
      const response = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID,
        ID.unique(),
        file
      );
    return response
    } catch (error) {
      throw error;
    }
  }

  async getFileByUniqueID(id) {
    try {
      const reponse = await storage.getFileView(
        process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID,
        id
      );
      return reponse;
    } catch (error) {
      throw error;
    }
  }
}


const imageStorage = new ImageStorage();
export default imageStorage;
