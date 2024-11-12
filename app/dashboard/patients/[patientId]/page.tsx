"use client";

import DeleteModal from "@/components/DeleteModal";
import { Button } from "@/components/ui/button";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getPatientInfo } from "@/lib/actions/patient.actions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PatientInfo = () => {
  const [patient, setPatient] = useState<PatientInfo>();
  const [open, setOpen] = useState(false);

  const { token } = useLocalStorage();
  const params = useParams();

  const patientId = params.patientId as string;

  useEffect(() => {
    if (!token) return;
    const fetchPatient = async () => {
      try {
        const res = await getPatientInfo(token, patientId);
        if (res) {
          setPatient(res);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatient();
  }, [token]);

  if (open) {
    return (
      <DeleteModal
        open={open}
        setOpen={setOpen}
        id={patientId}
        type="patient"
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="sub-header">{patient?.fullname}</h1>
        </div>
        <div>
          <Button
            variant="ghost"
            className={`capitalize text-red-400`}
            onClick={() => setOpen(true)}
          >
            Delete Patient
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
