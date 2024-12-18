"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteModal from "@/components/DeleteModal";
import { Button } from "@/components/ui/button";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getPatientInfo } from "@/lib/actions/patient.actions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PatientInfo = () => {
  const [patient, setPatient] = useState<PatientInfo>();
  const [open, setOpen] = useState(false);

  const { token, userData } = useLocalStorage();
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

  function getTable(header: string, data: string) {
    return (
      <Table>
        <TableHeader className="bg-dark-200">
          <TableRow className="shad-table-row-header">
            <TableHead className="w-[100px]">{header}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="shad-table-row">
            <TableCell className="font-medium">{data}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <div>
      {userData.role === "Admin" && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className={`capitalize text-red-400`}
            onClick={() => setOpen(true)}
          >
            Delete Patient
          </Button>
        </div>
      )}
      <div>
        <div className="flex flex-col justify-center items-center text-center my-4">
          <h1 className="sub-header">{patient?.fullname}</h1>
          <p className="capitalize">{patient?.gender}</p>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
          {patient?.address && getTable("Occupation", patient?.occupation)}

          {patient?.address && getTable("Address", patient?.address)}

          {patient?.phone && getTable("Phone Number", patient?.phone)}

          {patient?.email && getTable("Email", patient?.email)}

          {patient?.emergencyContactName &&
            getTable("Emergency Contact Name", patient?.emergencyContactName)}

          {patient?.emergencyContactNumber &&
            getTable(
              "Emergency Contact Number",
              patient?.emergencyContactNumber
            )}

          {patient?.insuranceProvider &&
            getTable("Insurance Provider", patient?.insuranceProvider)}

          {patient?.insurancePolicyNumber &&
            getTable("Insurance Policy Number", patient?.insurancePolicyNumber)}

          {patient?.allergies && getTable("Allergies", patient?.allergies)}

          {patient?.currentMedication &&
            getTable("Current Medication", patient?.currentMedication)}

          {patient?.familyMedicalHistory &&
            getTable("Family Medical History", patient?.familyMedicalHistory)}

          {patient?.pastMedicalHistory &&
            getTable("Past Medical History", patient?.pastMedicalHistory)}

          {patient?.primaryPhysician &&
            getTable("Primary Physician", patient?.primaryPhysician)}
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
