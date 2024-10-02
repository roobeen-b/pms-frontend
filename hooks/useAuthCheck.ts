"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuthCheck = () => {
  const router = useRouter();
  const token = typeof window != "undefined" && localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [token]);

  return { isLoading };
};
