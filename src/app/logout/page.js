"use client";
import userAuthentication from "@/appwrite/authentication";
import useAuth from "@/context/useAuth";
import { Button, Center } from "@chakra-ui/react";

const LogoutPage = () => {
  const { setAuthStatus } = useAuth();
  async function _logOut() {
    try {
      await userAuthentication.logOut();
      setAuthStatus(false);
      alert("Logout successful");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }
  return (
   <Center mt={8} alignItems={"center"} justifyContent={"center"}>
     <Button
      colorScheme={"teal"}
      onClick={_logOut}
    >
      Log Out
    </Button>
   </Center>
  );
};

export default LogoutPage;
