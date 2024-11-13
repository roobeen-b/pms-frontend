"use client";

import Image from "next/image";
import Navlinks from "./Navlinks";
import SignOutBtn from "./SignOutBtn";
import { useRouter } from "next/navigation";

const Sidenav = () => {
  const router = useRouter();

  return (
    <div className="h-screen md:flex md:flex-col shadow-xl sticky left-0 top-0 z-20 bg-dark-400">
      <Image
        src="/assets/icons/logo-full.svg"
        alt="logo"
        width={1000}
        height={1000}
        className="h-12 w-fit md:mb-3 md:px-2 md:mt-4 cursor-pointer"
        onClick={() => router.push("/dashboard")}
      />

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Navlinks setOpen={() => {}} />
        <div className="p-4">
          <SignOutBtn />
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
