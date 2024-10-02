"use client";

import Image from "next/image";
import Navlinks from "./Navlinks";
import { useRouter } from "next/navigation";

const Sidenav = () => {
  const router = useRouter();
  return (
    <div className="h-screen md:w-1/5 flex flex-col p-5 shadow-xl sticky left-0 top-0 z-20 bg-dark-400">
      <Image
        src="/assets/icons/logo-full.svg"
        alt="logo"
        width={1000}
        height={1000}
        className="h-10 w-fit mb-12"
      />

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Navlinks />

        <div
          className="flex items-end cursor-pointer"
          onClick={() => {
            localStorage.clear();
            router.push("/");
          }}
        >
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
