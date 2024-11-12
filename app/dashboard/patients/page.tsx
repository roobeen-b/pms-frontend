"use client";

import { DataTable } from "@/components/table/Datatable";
import { patientColumns } from "@/components/table/patientColumns";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getAllPatients } from "@/lib/actions/patient.actions";
import { useEffect, useState } from "react";

const Patients = () => {
  const [patients, setPatients] = useState<PatientInfo[]>([]);
  const { token } = useLocalStorage();

  useEffect(() => {
    if (!token) return;
    const fetchPatients = async () => {
      try {
        const res = await getAllPatients(token);
        if (res && res.status === 200) {
          setPatients(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatients();
  }, [token]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sub-header">All Patients</h1>
      <div>
        <DataTable data={patients} columns={patientColumns} />
      </div>
    </div>
  );
};

export default Patients;
