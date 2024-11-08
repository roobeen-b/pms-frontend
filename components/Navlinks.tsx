"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/dashboard", icon: "/assets/icons/home.svg" },
  {
    name: "Appointments",
    href: "/dashboard/appointments",
    icon: "/assets/icons/calendar.svg",
  },
  {
    name: "Doctors",
    href: "/dashboard/doctors",
    icon: "/assets/icons/doctor.svg",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: "/assets/icons/settings.svg",
  },
];

const docLinks = [
  { name: "Home", href: "/dashboard", icon: "/assets/icons/home.svg" },
  {
    name: "Appointments",
    href: "/dashboard/appointments",
    icon: "/assets/icons/calendar.svg",
  },
  // {
  //   name: "Doctors",
  //   href: "/dashboard/doctors",
  //   icon: "/assets/icons/doctor.svg",
  // },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: "/assets/icons/settings.svg",
  },
];

const Navlinks = () => {
  const path = usePathname();
  const { userData } = useLocalStorage();

  return (
    <div className="flex flex-col gap-2">
      {userData.role === "Doctor"
        ? docLinks.map((link) => (
            <div
              className={`flex gap-2 px-4 ${
                path === link.href ? "bg-dark-300" : ""
              }`}
              key={link.href}
            >
              <Image
                src={link.icon}
                width={24}
                height={24}
                alt="Navlink icon"
              />
              <Link
                href={link.href}
                key={link.name}
                className={`py-4 rounded-sm`}
              >
                {link.name}
              </Link>
            </div>
          ))
        : links.map((link) => (
            <div
              className={`flex gap-2 px-4 ${
                path === link.href ? "bg-dark-300" : ""
              }`}
              key={link.href}
            >
              <Image
                src={link.icon}
                width={24}
                height={24}
                alt="Navlink icon"
              />
              <Link
                href={link.href}
                key={link.name}
                className={`py-4 rounded-sm`}
              >
                {link.name}
              </Link>
            </div>
          ))}
    </div>
  );
};

export default Navlinks;
