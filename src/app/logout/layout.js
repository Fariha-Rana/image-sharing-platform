"use client";
import useAuth from "@/context/useAuth";
function ProtectedLayout({ children }) {
  const { authStatus } = useAuth();
    if (!authStatus) return
    return <>{children}</>;
}

export default ProtectedLayout;
