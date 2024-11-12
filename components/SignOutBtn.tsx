"use client";

import { useState } from "react";
import SignoutModal from "./SignoutModal";

const SignOutBtn = () => {
  const [open, setOpen] = useState(false);

  if (open) {
    return <SignoutModal open={open} setOpen={setOpen} />;
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
    </>
  );
};

export default SignOutBtn;
