"use client";

import AppointmentButton from "@/components/AppointmentButton";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/Datatable";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getAllAppointmentsByUser } from "@/lib/actions/appointment.actions";
import { useEffect, useState } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState<AppointmentParams[]>([]);
  const { token } = useLocalStorage();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getAllAppointmentsByUser(token);

        if (res) {
          setAppointments(res.allAppointments);
        }
      } catch (error) {
        console.log(`Error fetching appointments: ${error}`);
      }
    };

    fetchAppointments();
  }, [token]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="sub-header">All Appointments</h1>
        <AppointmentButton type="Create" />
      </div>
      <div>
        <DataTable data={appointments} columns={columns} />
      </div>
    </div>
  );
};

export default Appointments;
