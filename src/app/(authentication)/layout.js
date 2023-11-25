"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "@/context/useAuth";
function loginlayout({ children }) {
  const router = useRouter();
  const { authStatus} = useAuth();
  useEffect(() => {
      if (authStatus) router.replace("/");
  }, []);
  
  return (
    <>
       { children }
    </>
  );
}

export default loginlayout;
