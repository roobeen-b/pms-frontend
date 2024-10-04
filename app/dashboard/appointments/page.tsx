import NewAppointmentButton from "@/components/NewAppointmentButton";
import { getAllAppointments } from "@/lib/actions/appointment.actions";

const Appointments = async () => {
  const allAppointments = await getAllAppointments();
  console.log(allAppointments);
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="sub-header">All Appointments</h1>
        <NewAppointmentButton />
      </div>
      <div></div>
    </div>
  );
};

export default Appointments;
