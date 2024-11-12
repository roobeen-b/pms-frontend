"use client";

import NewAppointmentButton from "@/components/AppointmentButton";
import { getAllCounts } from "@/lib/actions/appointment.actions";
import { useEffect, useState } from "react";
import StatCards from "@/components/StatCards";
import useLocalStorage from "@/hooks/useLocalStorage";
import AdminStatCard from "@/components/AdminStatCard";

const Dashboard = () => {
  const [allCounts, setAllCounts] = useState<AllCounts>({
    appointmentCount: {
      allAppointments: 0,
      pendingAppointments: 0,
      scheduledAppointments: 0,
      cancelledAppointments: 0,
    },
    patientCount: 0,
    doctorCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const { token, userData } = useLocalStorage();

  useEffect(() => {
    if (!token) return;
    const fetchAppointments = async () => {
      try {
        const res = await getAllCounts(token);

        if (res) {
          setAllCounts(res);
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
    <>
      {userData.role !== "Admin" ? (
        <>
          <header className="sub-header">
            Checkout all your appointments here
          </header>
          <main className="mt-4">
            <StatCards appointments={allCounts} loading={isLoading} />

            <section className="flex justify-center gap-2 mt-6">
              <NewAppointmentButton type="View" />
              {userData.role !== "Doctor" && (
                <NewAppointmentButton type="Create" />
              )}
            </section>
          </main>
        </>
      ) : (
        <>
          <header className="sub-header">Checkout all the details here</header>
          <main className="mt-4">
            <section className="admin-stat">
              <AdminStatCard
                icon="/assets/icons/calendar.svg"
                count={allCounts?.appointmentCount?.allAppointments}
                type={"appointments"}
                label={"Total Appointments"}
              />
              <AdminStatCard
                icon="/assets/icons/user.svg"
                count={allCounts?.patientCount}
                type={"patients"}
                label={"Total Patients"}
              />
              <AdminStatCard
                icon="/assets/icons/doctor.svg"
                count={allCounts?.doctorCount}
                type={"doctors"}
                label={"Total Doctors"}
              />
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default Dashboard;
