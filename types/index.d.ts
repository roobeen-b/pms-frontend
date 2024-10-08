/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type RegisterAs = "User" | "Doctor";
declare type Gender = "male" | "female" | "other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
}
declare interface User extends CreateUserParams {
  userId: string;
}

declare interface RegisterUserParams {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies?: string | undefined;
  currentMedication?: string | undefined;
  familyMedicalHistory?: string | undefined;
  pastMedicalHistory?: string | undefined;
  identificationType?: string | undefined;
  identificationNumber?: string | undefined;
  identificationDocument?: FormData | undefined;
  privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
  userId: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  type: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
  cancellationReason: string | undefined;
};

declare interface AppointmentParams {
  appointmentId: string;
  fullname: string;
  phone: string;
  email: string;
  schedule: Date;
  reason: string;
  note: string;
  primaryPhysician: string;
  status: "scheduled" | "pending" | "cancelled";
  cancellationReason: string;
  userId: string;
  createdDate: Date;
  updatedDate: Date;
}

declare interface AppointmentCounts {
  pendingAppointments: number;
  scheduledAppointments: number;
  cancelledAppointments: number;
}
