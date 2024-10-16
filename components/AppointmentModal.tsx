"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import AppointmentForm from "./forms/AppointmentForm";
import AppointmentDetails from "./AppointmentDetails";

type AppointmentModalProps = {
  type: "schedule" | "cancel" | "view";
  userId: string;
  appointment?: AppointmentParams;
};

const AppointmentModal = ({ type, appointment }: AppointmentModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${
            type === "schedule"
              ? "text-green-500"
              : type === "view"
              ? "text-blue-400"
              : "text-red-500"
          }`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            {type !== "view" &&
              `Please fill in the following details to ${type} an appointment`}
          </DialogDescription>
        </DialogHeader>
        {type !== "view" ? (
          <AppointmentForm
            type={type}
            appointment={appointment}
            setOpen={setOpen}
          />
        ) : (
          <AppointmentDetails appointment={appointment} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
