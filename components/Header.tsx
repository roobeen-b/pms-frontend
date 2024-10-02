"use client";

const Header = () => {
  const user =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("userData") || "");

  return (
    <header className="py-5 px-[5%] xl:px-12 shadow-md sticky top-0 z-20 bg-dark-400">
      Welcome, {user.fullname}
    </header>
  );
};

export default Header;
