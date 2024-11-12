"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import DeleteModal from "../DeleteModal";

export const patientColumns: ColumnDef<PatientInfo>[] = [
  {
    header: "S.No.",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.phone || ""}</p>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.email || ""}</p>
    ),
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      const router = useRouter();
      const [open, setOpen] = useState(false);

      if (open) {
        return (
          <DeleteModal
            open={open}
            setOpen={setOpen}
            id={data.userId}
            type="patient"
          />
        );
      }

      return (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            className={`capitalize text-blue-400`}
            onClick={() => router.push(`/dashboard/patients/${data.userId}`)}
          >
            View Details
          </Button>

          <Button
            variant="ghost"
            className={`capitalize text-red-400`}
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
