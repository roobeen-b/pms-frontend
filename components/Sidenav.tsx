import Image from "next/image";
import Navlinks from "./Navlinks";

const Sidenav = () => {
  return (
    <div className="border border-white h-screen md:w-1/5 flex flex-col p-5">
      <Image
        src="/assets/icons/logo-full.svg"
        alt="logo"
        width={1000}
        height={1000}
        className="h-10 w-fit mb-12"
      />

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Navlinks />

        <div className="flex items-end">Sign Out</div>
      </div>
    </div>
  );
};

export default Sidenav;
