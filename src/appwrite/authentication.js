import { ID} from "appwrite";
import { account } from "./config";

export class UserAuthentication {
  async createAccount({
    email,
    password,
    name,
  }) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
  
      if (userAccount) return await this.login({email,
        password});
    } catch (err) {
      throw err;
    }
  }

  async login({email,
    password}) {
    try {
      const loggedinUser = await account.createEmailSession(email, password);
      return loggedinUser
    } catch (error) {
      throw error;
    }
  }

  async isLoggedIn() {
    try {
      const currentUser = await this.getCurrentUser();
      return currentUser ? true : false;
    } catch (error) {
    }
  }
  
  async getCurrentUser() {
    try {
      const currentUser = await account.get();
      return currentUser || null;
    } catch (error) {
    }
  }
  

  async logOut() {
    try {
       await account.deleteSession("current");
    } catch (error) {
    }
  }
}

const userAuthentication = new UserAuthentication();
export default userAuthentication;
