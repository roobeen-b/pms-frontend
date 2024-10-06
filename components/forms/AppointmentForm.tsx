"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { Doctors } from "@/constants";
import Image from "next/image";
import { SelectItem } from "../ui/select";
import {
  createNewAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { useAuth } from "@/context/AuthProvider";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  SELECT = "select",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SKELETON = "skeleton",
}

const AppointmentForm = ({
  type,
  appointment,
  setOpen,
}: {
  type: "create" | "schedule" | "cancel";
  appointment?: AppointmentParams;
  setOpen?: (open: boolean) => void;
}) => {
  const { token } = useAuth()!;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const user =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("userData") || "");

  const AppointmentFormValidation = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician || "",
      schedule: appointment
        ? new Date(appointment?.schedule)
        : new Date(Date.now()),
      reason: appointment?.reason || "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;

      case "cancel":
        status = "cancelled";
        break;

      default:
        status = "pending";
        break;
    }
    try {
      if (type === "create" && user.id) {
        const appointmentData = {
          userId: user.id,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason || "",
          note: values.note || "",
          status: status as Status,
        };
        const appointment = await createNewAppointment(appointmentData, token);
        if (appointment) {
          form.reset();
          router.push(`/dashboard/appointments`);
        }
      } else {
        const appointmentToUpdate = {
          userId: user.id,
          appointmentId: appointment?.appointmentId || "",
          primaryPhysician: values?.primaryPhysician,
          schedule: new Date(values?.schedule),
          status: status as Status,
          cancellationReason: values?.cancellationReason,
          reason: values.reason || "",
          note: values.note,
          type,
        };

        const updatedAppointment = await updateAppointment(
          appointmentToUpdate,
          token
        );

        if (updatedAppointment) {
          if (setOpen) {
            setOpen(false);
          }
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  let buttonLabel;
  switch (type) {
    case "create":
      buttonLabel = "Create Appointment";
      break;

    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;

    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;

    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "create" && (
          <section className="space-y-6 mb-12">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Choose a doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex items-center cursor-pointer gap-2">
                    <Image
                      src={doctor.image}
                      width={24}
                      height={24}
                      alt="Doctor's image"
                      className="border border-dark-500 rounded-full"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="reason"
                label="Reason for appointment"
                placeholder="Enter reason for appointment"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="note"
                label="Additional comments/notes"
                placeholder="Enter any comments/notes"
              />
            </div>

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              label="Expected appointment date"
              name="schedule"
              placeholder="Select your appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm:aa"
            />
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Enter reason for cancellation"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
