"use client";

import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Sidenav from "@/components/Sidenav";
import { useAuthCheck } from "@/hooks/useAuthCheck";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuthCheck();

  if (isLoading) return <Loader />;

  return (
    <div className="h-screen w-screen">
      <div className="flex">
        <div className="hidden md:block md:w-1/4 xl:w-1/5">
          <Sidenav />
        </div>
        <div className="flex flex-col w-full md:w-3/4 xl:w-4/5">
          <Header />
          <main className="py-5 px-[5%] xl:px-12">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
