"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuthCheck = () => {
  const router = useRouter();
  const userData =
    typeof window != "undefined" && localStorage.getItem("userData");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userData) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [userData]);

  return { isLoading };
};
