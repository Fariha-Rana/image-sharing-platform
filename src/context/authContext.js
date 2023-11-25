"use client"
import { createContext, useState, useEffect} from "react";
import userAuthentication from "@/appwrite/authentication";
export const AuthContext = createContext()

export default function AuthProvider({children}) {
  const [authStatus, setAuthStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    async function checkLogInStatus(){
     try{
      const isLogIn = await userAuthentication.isLoggedIn();
      if(isLogIn) setAuthStatus(true)
      let _userdata = await userAuthentication.getCurrentUser()
     if(_userdata) setUserData(_userdata)
     }catch(err){
     }
    }
    checkLogInStatus()
  }, [])
  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus, userData, setUserData}}>
    {children}
    </AuthContext.Provider>
  );
}