"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Navlink {
  name: string;
  href: string;
  icon: string;
}

const allLinks: Navlink[] = [
  { name: "Home", href: "/dashboard", icon: "/assets/icons/home.svg" },
  {
    name: "Appointments",
    href: "/dashboard/appointments",
    icon: "/assets/icons/calendar.svg",
  },
  {
    name: "Patients",
    href: "/dashboard/patients",
    icon: "/assets/icons/user.svg",
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

const links: Navlink[] = [
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

const docLinks: Navlink[] = [
  { name: "Home", href: "/dashboard", icon: "/assets/icons/home.svg" },
  {
    name: "Appointments",
    href: "/dashboard/appointments",
    icon: "/assets/icons/calendar.svg",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: "/assets/icons/settings.svg",
  },
];

const Navlinks = () => {
  const path = usePathname();
  const { userData } = useLocalStorage();

  function generateSideNav(links: Navlink[]) {
    return links.map((link) => (
      <div
        className={`flex gap-2 px-4 ${path === link.href ? "bg-dark-300" : ""}`}
        key={link.href}
      >
        <Image src={link.icon} width={24} height={24} alt="Navlink icon" />
        <Link href={link.href} key={link.name} className={`py-4 rounded-sm`}>
          {link.name}
        </Link>
      </div>
    ));
  }

  return (
    <div className="flex flex-col gap-2">
      {userData.role === "Admin"
        ? generateSideNav(allLinks)
        : userData.role === "Doctor"
        ? generateSideNav(docLinks)
        : generateSideNav(links)}
    </div>
  );
};

export default Navlinks;
