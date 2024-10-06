"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = window.localStorage.getItem("token");
      if (storedToken) {
        try {
          setToken(JSON.parse(storedToken));
        } catch (error) {
          console.log(`Error parsing token: ${error}`);
        }
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
