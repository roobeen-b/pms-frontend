"use client";

import NewAppointmentButton from "@/components/AppointmentButton";
import {
  getAllAppointmentsByDoctor,
  getAllAppointmentsByUser,
} from "@/lib/actions/appointment.actions";
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

  const { token, userData } = useLocalStorage();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let res;
        if (userData.role === "User") {
          res = await getAllAppointmentsByUser(token);
        } else if (userData.role === "Doctor") {
          res = await getAllAppointmentsByDoctor(token);
        }

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
          {userData.role !== "Doctor" && <NewAppointmentButton type="Create" />}
        </section>
      </main>
    </>
  );
};

export default Dashboard;
