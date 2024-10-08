"use client";

import { useEffect, useState } from "react";

const useGetToken = () => {
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
  }, [token]);

  return { token };
};

export default useGetToken;
