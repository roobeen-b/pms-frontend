import StatCard from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/Datatable";
import { getRecentAppointments } from "@/lib/actions/appointment.actions";
import Image from "next/image";

const AdminPage = async () => {
  const appointments = await getRecentAppointments();

  return (
    <div className="flex flex-col mx-auto max-w-7xl space-y-8">
      <header className="admin-header">
        <Image
          src="/assets/icons/logo-full.svg"
          alt="Admin logo"
          height={32}
          width={100}
          className="h-10 w-fit"
        />
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

export default AdminPage;
