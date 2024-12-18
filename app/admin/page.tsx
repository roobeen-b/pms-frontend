"use client";

import SignOutBtn from "@/components/SignOutBtn";
import StatCards from "@/components/StatCards";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/Datatable";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getAllAppointments } from "@/lib/actions/appointment.actions";
import { decryptKey } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const router = useRouter();
  const path = usePathname();
  const { token } = useLocalStorage();

  const [appointments, setAppointments] = useState<Appointments>({
    scheduledAppointments: 0,
    pendingAppointments: 0,
    cancelledAppointments: 0,
    allAppointments: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    if (encryptedKey) {
      const decryptedpasskey = decryptKey(encryptedKey);
      if (path) {
        if (decryptedpasskey !== process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
          router.push("/");
        }
      }
    } else {
      router.push("/");
    }
  }, [encryptedKey]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getAllAppointments(token);
        console.log(res);
        if (res) {
          setAppointments(res);
        }
      } catch (error) {
        console.log(`Error fetching appointments: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  return (
    <div className="flex flex-col mx-auto max-w-7xl space-y-8">
      <header className="admin-header">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="Admin logo"
            height={32}
            width={100}
            className="h-10 w-fit"
          />
        </Link>
        <div className="flex items-center gap-2">
          <Image
            src="/assets/images/admin.png"
            alt="user"
            height={32}
            width={32}
          />
          <p>Admin</p>
          |
          <SignOutBtn />
        </div>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome, Admin</h1>
          <p className="text-dark-700">
            Start your day with managing new appointments
          </p>
        </section>

        <StatCards appointments={appointments} loading={isLoading} />

        <DataTable data={appointments.allAppointments} columns={columns} />
      </main>
    </div>
  );
};

export default AdminPage;
