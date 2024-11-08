"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const doctorColumns: ColumnDef<DoctorInfo>[] = [
  {
    header: "S.No.",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "fullname",
    header: "Doctor Name",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Image
          src={
            process.env.NEXT_PUBLIC_IMAGE_URL +
            "doctors/" +
            row.original.doctorPhoto
          }
          width={24}
          height={24}
          alt="Doctor's image"
          className="border border-dark-500 rounded-full"
        />
        <p className="text-14-medium">Dr. {row.original.fullname || ""}</p>
      </div>
    ),
  },
  {
    accessorKey: "specialty",
    header: "Specialties",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.specialty || ""}</p>
    ),
  },
  {
    accessorKey: "docLicenseNo",
    header: "License No",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.docLicenseNo || ""}</p>
    ),
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      const router = useRouter();
      return (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            className={`capitalize text-blue-400`}
            onClick={() => router.push(`/dashboard/doctors/${data.doctorId}`)}
          >
            View Details
          </Button>

          <Button
            variant="ghost"
            className={`capitalize text-green-400`}
            onClick={() =>
              router.push(
                `/dashboard/appointments/new-appointment?doctor=${data.fullname}`
              )
            }
          >
            Schedule Appointment
          </Button>
        </div>
      );
    },
  },
];
