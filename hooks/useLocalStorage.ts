"use client";

import { decryptKey } from "@/lib/utils";
import { useEffect, useState } from "react";

const useLocalStorage = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    fullname: "",
    role: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = window.localStorage.getItem("token");
      const userInfo = localStorage.getItem("userData") || "";

      if (storedToken && userInfo) {
        try {
          setToken(JSON.parse(storedToken));
          setUserData(JSON.parse(decryptKey(userInfo)));
        } catch (error) {
          console.log(`Error parsing token: ${error}`);
        }
      }
    }
  }, [token]);

  return { token, userData };
};

export default useLocalStorage;
