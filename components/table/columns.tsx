"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";
import useLocalStorage from "@/hooks/useLocalStorage";

export const columns: ColumnDef<AppointmentParams>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.fullname || ""}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        {formatDateTime(row.original.schedule).dateTime}
      </div>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doctor) => doctor.name === row.original.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image ?? "/assets/images/doctor.png"}
            alt={doctor?.name ?? "Doctor"}
            width={32}
            height={32}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name ?? "Unknown"}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      const { userData } = useLocalStorage();
      return (
        <div className="flex gap-1">
          {userData.role !== "User" && (
            <AppointmentModal
              type="schedule"
              userId={data.userId}
              appointment={data}
            />
          )}

          <AppointmentModal
            type="cancel"
            userId={data.userId}
            appointment={data}
          />
        </div>
      );
    },
  },
];
