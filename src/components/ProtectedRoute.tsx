"use client";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (!user) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Toaster />
      {isAuthenticated ? children : null}
    </>
  );
};

export default ProtectedRoute;
