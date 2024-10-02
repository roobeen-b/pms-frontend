import NewAppointmentButton from "@/components/NewAppointmentButton";

const Appointments = () => {
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
