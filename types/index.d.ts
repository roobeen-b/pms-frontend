/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type RegisterAs = "User" | "Doctor";
declare type Gender = "Male" | "Female" | "Other";
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

declare interface UpdateUserParams {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  role?: string;
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

declare interface PatientInfo extends RegisterUserParams {
  fullname: string;
  phone: string;
  email: string;
}

declare type CreateAppointmentParams = {
  userId: string;
  doctorId: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  doctorId: string;
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
  doctorId: string;
  createdDate: Date;
  updatedDate: Date;
}

declare interface AppointmentCounts {
  pendingAppointments: number;
  scheduledAppointments: number;
  cancelledAppointments: number;
}

declare interface Appointments extends AppointmentCounts {
  allAppointments: any[];
}

declare interface AllAppointmentCount extends AppointmentCounts {
  allAppointments: number;
}

declare interface AllCounts extends allAppointmentCount {
  appointmentCount: allAppointmentCount;
  patientCount: number;
  doctorCount: number;
}

declare interface RegisterDoctorInfo {
  doctorId: string;
  doctorLicenseNo: string;
  specialties: number;
  doctorPhoto: File;
  doctorDesc: string;
}

declare interface DoctorInfo extends RegisterDoctorInfo {
  fullname: string;
  email: string;
  phone: string;
  doctorPhoto: string;
  docLicenseNo: string;
  specialty: string;
}
