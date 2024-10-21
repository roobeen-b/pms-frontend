"use client";

import UpdateUserForm from "@/components/forms/UpdateUserForm";
import useLocalStorage from "@/hooks/useLocalStorage";

const AccountSettings = () => {
  const { userData, token } = useLocalStorage();

  return (
    <div>
      <div className="sub-header">Update User</div>
      <UpdateUserForm token={token} userData={userData} />
    </div>
  );
};

export default AccountSettings;
