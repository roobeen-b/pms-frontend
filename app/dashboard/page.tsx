"use client";

import NewAppointmentButton from "@/components/AppointmentButton";
import { getAllAppointmentsByUser } from "@/lib/actions/appointment.actions";
import { useEffect, useState } from "react";
import StatCards from "@/components/StatCards";
import useLocalStorage from "@/hooks/useLocalStorage";

const Dashboard = () => {
  const [appointments, setAppointments] = useState<Appointments>({
    scheduledAppointments: 0,
    pendingAppointments: 0,
    cancelledAppointments: 0,
    allAppointments: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useLocalStorage();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getAllAppointmentsByUser(token);

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
    <>
      <header className="sub-header">
        Checkout all your appointments here
      </header>
      <main className="mt-4">
        <StatCards appointments={appointments} loading={isLoading} />

        <section className="flex justify-center gap-2 mt-6">
          <NewAppointmentButton type="View" />
          <NewAppointmentButton type="Create" />
        </section>
      </main>
    </>
  );
};

export default Dashboard;
