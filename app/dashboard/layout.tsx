import Header from "@/components/Header";
import Sidenav from "@/components/Sidenav";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen">
      <div className="flex">
        <Sidenav />
        <div className="flex flex-col">
          <header>
            <Header />
          </header>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
