"use client";

import { useRouter } from "next/navigation";

const SignOutBtn = () => {
  const router = useRouter();

  return (
    <div
      className="flex items-end cursor-pointer"
      onClick={() => {
        localStorage.clear();
        router.push("/");
      }}
    >
      Sign Out
    </div>
  );
};

export default SignOutBtn;
