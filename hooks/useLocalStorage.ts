"use client";

import { decryptKey } from "@/lib/utils";
import { useEffect, useState } from "react";

const useLocalStorage = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({
    userId: "",
    fullname: "",
    role: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = window.localStorage.getItem("token");
      const user = JSON.parse(
        decryptKey(localStorage.getItem("userData") || "")
      );
      if (storedToken) {
        try {
          setToken(JSON.parse(storedToken));
          setUserData(user);
        } catch (error) {
          console.log(`Error parsing token: ${error}`);
        }
      }
    }
  }, [token]);

  return { token, userData };
};

export default useLocalStorage;
