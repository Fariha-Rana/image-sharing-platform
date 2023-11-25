import { database } from "./config";
import { ID, Permission, Role, Query } from "appwrite";

class PostDatabase {
  setPostData(data) {
    this._data = data;
  }

  getPostData() {
    return this._data;
  }

  async loadPostData() {
    try {
      let response;
      let allDocuments = [];

      do {
        response = await database.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
          [Query.limit(100)]
        );

        if (response.documents.length > 0) {
          allDocuments = allDocuments.concat(response.documents);

          const lastId = response.documents[response.documents.length - 1].$id;

          response = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
            [Query.limit(100), Query.cursorAfter(lastId)]
          );
        }
      } while (response.documents.length > 0);

      if (allDocuments.length !== 0) {
        this.setPostData(allDocuments);
      } else {
        this.setPostData(["no posts available"]);
      }
    } catch (error) {

    }
  }

  async uploadPostData(data) {
    try {
      const permissions = [];
      permissions.push(Permission.write(Role.users()));

      const createdDocument = await database.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
        ID.unique(),
        data,
        permissions
      );
      return createdDocument;
    } catch (error) {
      throw error;
    }
  }

  async getUserPost(id) {
    try {
      const list = await database.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
        [Query.equal("userid", id)]
      );
      
      if (list.documents.length > 0) {
        return list;
      }
    } catch (error) {
      throw error;
    }
  }

  async _updateDocument(updatedData, documentid) {
    try {
      const  response  = await database.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
        documentid,
        updatedData
      );
      return response
    } catch (error) {
      throw error;
    }
  }
}


const postDatabase = new PostDatabase();
export default postDatabase;
