"use client";

import { decryptKey } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import StatCard from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/Datatable";
import Image from "next/image";
import Link from "next/link";

interface Appointments {
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
  documents: any[];
}

const AdminMain = ({ appointments }: { appointments: Appointments }) => {
  const router = useRouter();
  const path = usePathname();
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
        } else {
          setIsLoading(false);
        }
      }
    } else {
      router.push("/");
    }
  }, [encryptedKey]);

  if (isLoading)
    return (
      <div className="h-screen w-screen flex justify-center items-center gap-4">
        <Image
          src="/assets/icons/loader.svg"
          alt="loader"
          height={24}
          width={24}
          className="animate-spin"
        />
        Loading ...
      </div>
    );

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
            alt="User"
            height={32}
            width={32}
          />
          <p>Admin</p>
        </div>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome, Admin</h1>
          <p className="text-dark-700">
            Start your day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="scheduled"
            icon="/assets/icons/appointments.svg"
            count={appointments.scheduledCount}
            label="Total number of scheduled appointments"
          />
          <StatCard
            type="pending"
            icon="/assets/icons/pending.svg"
            count={appointments.pendingCount}
            label="Total number of pending appointments"
          />
          <StatCard
            type="cancelled"
            icon="/assets/icons/cancelled.svg"
            count={appointments.cancelledCount}
            label="Total number of cancelled appointments"
          />
        </section>

        <DataTable data={appointments.documents} columns={columns} />
      </main>
    </div>
  );
};

export default AdminMain;
