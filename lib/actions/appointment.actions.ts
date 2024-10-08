"use server";

import { ID, Query } from "node-appwrite";
import { databases, messaging } from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import ApiMethods from "@/apiManager/apiMethods";

export const getAllAppointments = async (token: string) => {
  try {
    const allAppointments = (await ApiMethods.get("appointments", token)) as {
      data: AppointmentParams[];
    };

    const initialCounts: AppointmentCounts = {
      pendingAppointments: 0,
      scheduledAppointments: 0,
      cancelledAppointments: 0,
    };

    if (allAppointments) {
      const counts = (allAppointments.data as AppointmentParams[]).reduce(
        (acc: AppointmentCounts, appointment: AppointmentParams) => {
          switch (appointment.status) {
            case "pending":
              acc.pendingAppointments += 1;
              break;

            case "scheduled":
              acc.scheduledAppointments += 1;
              break;

            case "cancelled":
              acc.cancelledAppointments += 1;
              break;
            default:
              break;
          }
          return acc;
        },
        initialCounts
      );
      const data = {
        totalCount: allAppointments.data.length,
        ...counts,
        allAppointments: allAppointments.data,
      };
      return data;
    }
  } catch (error) {
    console.log("An error occured while fetching appointment: ", error);
  }
};

export const getAllAppointmentsByUser = async (token: string) => {
  try {
    const allAppointments = (await ApiMethods.get(
      "appointments/getAppointmentsByUser",
      token
    )) as { data: AppointmentParams[] };

    const initialCounts: AppointmentCounts = {
      pendingAppointments: 0,
      scheduledAppointments: 0,
      cancelledAppointments: 0,
    };

    if (allAppointments) {
      const counts = (allAppointments.data as AppointmentParams[]).reduce(
        (acc: AppointmentCounts, appointment: AppointmentParams) => {
          switch (appointment.status) {
            case "pending":
              acc.pendingAppointments += 1;
              break;

            case "scheduled":
              acc.scheduledAppointments += 1;
              break;

            case "cancelled":
              acc.cancelledAppointments += 1;
              break;
            default:
              break;
          }
          return acc;
        },
        initialCounts
      );
      const data = {
        totalCount: allAppointments.data.length,
        ...counts,
        allAppointments: allAppointments.data,
      };
      return data;
    }
  } catch (error) {
    console.log("An error occured while fetching appointment: ", error);
  }
};

export const createNewAppointment = async (
  appointment: CreateAppointmentParams,
  token: string
) => {
  try {
    const newAppointment = await ApiMethods.post(
      "appointments/create",
      appointment,
      token
    );
    revalidatePath("/dashboard/appointments");
    return newAppointment;
  } catch (error) {
    console.log("An error occured while creating appointment: ", error);
  }
};

export const updateAppointment = async (
  appointment: UpdateAppointmentParams,
  token: string
) => {
  try {
    const updatedAppointment = await ApiMethods.put(
      "appointments/update",
      appointment,
      token
    );

    if (!updatedAppointment) {
      throw new Error("Appointment not found!");
    }

    const smsMessage = `Greetings from Patient Plus. ${
      appointment.type === "schedule"
        ? `Your appointment is confirmed for ${
            formatDateTime(appointment.schedule!).dateTime
          } with Dr. ${appointment.primaryPhysician}`
        : `We regret to inform that your appointment for ${
            formatDateTime(appointment.schedule!).dateTime
          } is cancelled. Reason:  ${appointment.cancellationReason}`
    }.`;
    await sendSMSNotification(appointment.userId, smsMessage);

    revalidatePath("/dashboard/appointments");
    return updatedAppointment;
  } catch (error) {
    console.log(`Error while updating appointment: ${error}`);
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );

    return parseStringify(message);
  } catch (error) {
    console.log(`Error while sending sms: ${error}`);
  }
};
