"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const AppointmentButton = ({ type }: { type: string }) => {
  const router = useRouter();

  return (
    <Button
      className={type === "View" ? "shad-secondary-btn" : "shad-primary-btn"}
      onClick={
        type === "View"
          ? () => router.push("/dashboard/appointments")
          : () => router.push("/dashboard/appointments/new-appointment")
      }
    >
      {type === "View" ? "View All Appointments" : "+ New Appointment"}
    </Button>
  );
};

export default AppointmentButton;
