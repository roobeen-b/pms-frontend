"use client";

import Header from "@/components/Header";
import Sidenav from "@/components/Sidenav";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuthCheck();

  if (isLoading)
    return (
      <div className="h-screen w-screen flex justify-center items-center gap-4">
        <Image
          src="/assets/icons/loader.svg"
          alt="loader"
          height={24}
          width={24}
          className="animate-spin"
        />
        Loading ...
      </div>
    );

  return (
    <div className="h-screen w-screen">
      <div className="flex">
        <Sidenav />
        <div className="flex flex-col w-full">
          <Header />
          <main className="py-5 px-[5%] xl:px-12">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
