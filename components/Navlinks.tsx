"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/dashboard", icon: "/assets/icons/home.svg" },
  {
    name: "Appointments",
    href: "/dashboard/appointments",
    icon: "/assets/icons/calendar.svg",
  },
];

const Navlinks = () => {
  const path = usePathname();

  return (
    <div className="flex flex-col gap-2">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.name}
          className={`py-4 px-2 rounded-sm ${
            path === link.href ? "bg-dark-400" : ""
          } `}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Navlinks;
