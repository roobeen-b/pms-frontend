"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useEffect, useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { SelectItem } from "../ui/select";
import {
  createNewAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";
import { getAllDOctors } from "@/lib/actions/doctor.actions";

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
  type: "create" | "schedule" | "cancel" | "view";
  appointment?: AppointmentParams;
  setOpen?: (open: boolean) => void;
}) => {
  const { token, userData } = useLocalStorage();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState<DoctorInfo[]>([]);

  const doctorName = searchParams.get("doctor");

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

  const AppointmentFormValidation = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician || doctorName || "",
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
      if (type === "create" && userData.id) {
        const appointmentData = {
          userId: userData.id,
          primaryPhysician: values?.primaryPhysician,
          doctorId: doctors?.find(
            (doctor) => doctor.fullname === values.primaryPhysician
          )?.doctorId!,
          schedule: new Date(values.schedule),
          reason: values.reason || "",
          note: values.note || "",
          status: status as Status,
        };
        const appointment = await createNewAppointment(appointmentData, token);

        if (appointment) {
          if (appointment.status >= 400) {
            toast({
              variant: "destructive",
              title: appointment.message,
            });
          } else {
            toast({
              title: appointment.message,
            });
          }

          form.reset();
          router.push(`/dashboard/appointments`);
        }
      } else {
        const appointmentToUpdate = {
          userId: appointment?.userId!,
          appointmentId: appointment?.appointmentId || "",
          primaryPhysician: values?.primaryPhysician,
          doctorId: doctors?.find(
            (doctor) => doctor.fullname === values.primaryPhysician
          )?.doctorId!,
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
          if (updatedAppointment.status >= 400) {
            toast({
              variant: "destructive",
              title: updatedAppointment.message,
            });
          } else {
            toast({
              title: updatedAppointment.message,
            });
          }
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
              {doctors.map((doctor) => (
                <SelectItem key={doctor?.doctorId} value={doctor?.fullname}>
                  <div className="flex items-center cursor-pointer gap-2">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_URL +
                        "doctors/" +
                        doctor?.doctorPhoto
                      }
                      width={24}
                      height={24}
                      alt="Doctor's image"
                      className="border border-dark-500 rounded-full"
                    />
                    <p>{doctor?.fullname}</p>
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
