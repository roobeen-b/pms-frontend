"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { getAllDOctors } from "@/lib/actions/doctor.actions";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<AppointmentParams>[] = [
  {
    header: "S.No.",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.fullname || ""}</p>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Appointment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        {formatDateTime(row.original.schedule).dateTime}
      </div>
    ),
  },
  {
    accessorKey: "doctorId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Doctor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const [doctors, setDoctors] = useState<DoctorInfo[]>([]);

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
      const doctor = doctors.find(
        (doctor) => doctor.doctorId === row.original.doctorId
      );

      return (
        <div className="flex items-center gap-3">
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
          <p className="whitespace-nowrap">
            Dr. {doctor?.fullname ?? "Unknown"}
          </p>
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
          <AppointmentModal
            type="view"
            userId={data.userId}
            appointment={data}
          />

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
