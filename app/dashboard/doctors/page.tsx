"use client";

import { DataTable } from "@/components/table/Datatable";
import { doctorColumns } from "@/components/table/doctorColumns";
import { getAllDOctors } from "@/lib/actions/doctor.actions";
import { useEffect, useState } from "react";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState<DoctorInfo[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getAllDOctors();
        if (res && res.status === 200) {
          setDoctors(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sub-header">All Doctors</h1>
      <div>
        <DataTable data={doctors} columns={doctorColumns} />
      </div>
    </div>
  );
};

export default AllDoctors;
