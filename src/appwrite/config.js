import { Account, Client , Databases, Storage } from "appwrite";
export const appwrite = new Client();

appwrite
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const database = new Databases(appwrite, process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);
export const storage = new Storage(appwrite)
export const account = new Account(appwrite);

