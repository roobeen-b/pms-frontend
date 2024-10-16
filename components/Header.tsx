"use client";

import useLocalStorage from "@/hooks/useLocalStorage";

const Header = () => {
  const { userData } = useLocalStorage();

  return (
    <header className="py-5 px-[5%] xl:px-12 shadow-md sticky top-0 z-20 bg-dark-400">
      Welcome, {userData.fullname}
    </header>
  );
};

export default Header;
