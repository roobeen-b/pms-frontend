"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import BackButton from "./BackButton";
import Navlinks from "./Navlinks";
import { useState } from "react";
import SignOutBtn from "./SignOutBtn";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
  const { userData } = useLocalStorage();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="py-5 px-[5%] xl:px-12 shadow-md sticky top-0 z-20 bg-dark-400 flex justify-between items-center gap-4">
      <span className="hidden md:block">
        <BackButton />
      </span>
      <span className="hidden md:block">Welcome, {userData.fullname}</span>
      <Image
        src="/assets/icons/logo-full.svg"
        alt="logo"
        width={1000}
        height={1000}
        className="h-10 w-fit md:mb-12 block md:hidden"
        onClick={() => router.push("/dashboard")}
      />
      <button onClick={() => setOpen(!open)} className="md:hidden">
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <div className="md:hidden transition ease-in delay-200 absolute w-full h-[calc(100vh - 4rem)] top-20 left-0 bg-black flex flex-col justify-between">
          <Navlinks setOpen={setOpen} />
          <div className="p-4 flex justify-end">
            <SignOutBtn />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
