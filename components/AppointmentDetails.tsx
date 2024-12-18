"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import AppointmentModal from "./AppointmentModal";
import { formatDateTime } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";

const AppointmentDetails = ({
  appointment,
}: {
  appointment?: AppointmentParams;
}) => {
  const { userData } = useLocalStorage();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-4">
          <p>Patient/User Name:</p>
          <p className="text-gray-300 font-bold">{appointment?.fullname}</p>
        </div>
        <div className="flex justify-between gap-4">
          <p>Phone:</p>
          <p className="text-gray-300 font-bold">{appointment?.phone}</p>
        </div>
        <div className="flex justify-between gap-4">
          <p>Primary Physician:</p>
          <p className="text-gray-300 font-bold">
            {appointment?.primaryPhysician}
          </p>
        </div>
        <div className="flex justify-between gap-4">
          <p>Reason:</p>
          <p className="text-gray-300 font-bold">{appointment?.reason}</p>
        </div>
        <div className="flex justify-between gap-4">
          <p>Appointment DateTime:</p>
          <p className="text-gray-300 font-bold">
            {formatDateTime(appointment?.schedule!).dateTime}
          </p>
        </div>
        <div className="flex justify-between gap-4">
          <p>Appointment Status:</p>
          <p className="text-gray-300 font-bold">
            <StatusBadge status={appointment?.status!} />
          </p>
        </div>
        {appointment?.note && (
          <div className="flex justify-between gap-4">
            <p>Note:</p>
            <p className="text-gray-300 font-bold">{appointment?.note}</p>
          </div>
        )}
        {appointment?.cancellationReason && (
          <div className="flex justify-between gap-4">
            <p>Cancellation Reason:</p>
            <p className="text-gray-300 font-bold">
              {appointment?.cancellationReason}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        {userData.role !== "user" && (
          <AppointmentModal
            type="schedule"
            userId={userData.id}
            appointment={appointment}
          />
        )}

        {/* <AppointmentModal
          type="cancel"
          userId={userData.id}
          appointment={appointment}
        /> */}
      </div>
    </div>
  );
};

export default AppointmentDetails;
