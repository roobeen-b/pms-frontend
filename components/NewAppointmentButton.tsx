"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const NewAppointmentButton = () => {
  const router = useRouter();

  return (
    <Button
      className="shad-primary-btn"
      onClick={() => router.push("/dashboard/appointments/new-appointment")}
    >
      + New Appointment
    </Button>
  );
};

export default NewAppointmentButton;
