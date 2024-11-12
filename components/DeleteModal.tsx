"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useLocalStorage from "@/hooks/useLocalStorage";
import { deleteAppointment } from "@/lib/actions/appointment.actions";
import { deletePatient } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";

const DeleteModal = ({
  open,
  setOpen,
  id,
  type,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
  type: "patient" | "appointment" | "doctor";
}) => {
  const { token } = useLocalStorage();
  const router = useRouter();

  async function handleDelete() {
    switch (type) {
      case "patient":
        await deletePatient(token, id);
        router.push("/dashboard/patients");
        break;

      case "appointment":
        await deleteAppointment(token, id);
        router.push("/dashboard/appointments");
        break;

      case "patient":
        await deletePatient(token, id);
        router.push("/dashboard/patients");
        break;

      default:
        break;
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the data
            and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="text-red-400">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
