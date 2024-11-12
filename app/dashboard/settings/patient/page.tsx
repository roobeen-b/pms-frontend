"use client";

import PatientInfoForm from "@/components/forms/PatientInfoForm";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getPatientInfo } from "@/lib/actions/patient.actions";
import { useEffect, useState } from "react";

const PatientSettings = () => {
  const { userData, token } = useLocalStorage();
  const [patientData, setPatientData] = useState<any>(null);

  useEffect(() => {
    if (!token) return;
    const fetchPatientData = async () => {
      try {
        const patientInfo = await getPatientInfo(token, userData.id);
        setPatientData(patientInfo);
      } catch (error) {
        console.log(`Error fetching patient data: ${error}`);
      }
    };
    fetchPatientData();
  }, [token]);

  return (
    <div>
      <PatientInfoForm
        isEdit={true}
        userId={userData.id}
        token={token}
        patientData={patientData}
      />
    </div>
  );
};

export default PatientSettings;
