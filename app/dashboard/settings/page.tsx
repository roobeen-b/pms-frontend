"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Settings = () => {
  const { userData } = useLocalStorage();

  return (
    <div className="flex flex-col gap-4">
      <div className="sub-header">Settings</div>
      <div className="flex gap-4">
        <Link href="/dashboard/settings/account">
          <div className="p-4 bg-black rounded flex flex-col items-center gap-2">
            <Image
              src="/assets/icons/password.svg"
              width={32}
              height={32}
              alt="account settings image"
            />
            <p>Update Account Info</p>
          </div>
        </Link>
        {userData.role === "User" && (
          <Link href="/dashboard/settings/patient">
            <div className="p-4 bg-black rounded flex flex-col items-center gap-2">
              <Image
                src="/assets/icons/user.svg"
                width={32}
                height={32}
                alt="patient settings image"
              />
              <p>Update Patient Info</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Settings;
