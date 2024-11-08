"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignOutBtn = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  function handleSignOut() {
    localStorage.clear();
    router.push("/");
  }

  return (
    <>
      <div
        className="flex items-end cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        Sign Out
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="shad-alert-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to sign out?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOut}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SignOutBtn;
