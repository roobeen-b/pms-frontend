import CardSkeletons from "./skeletons/CardSkeletons";
import StatCard from "./StatCard";

const StatCards = ({
  appointments,
  loading,
}: {
  appointments: Appointments;
  loading: boolean;
}) => {
  if (loading) {
    return <CardSkeletons />;
  }

  return (
    <section className="admin-stat">
      <StatCard
        type="scheduled"
        icon="/assets/icons/appointments.svg"
        count={appointments.scheduledAppointments}
        label="Total number of scheduled appointments"
      />
      <StatCard
        type="pending"
        icon="/assets/icons/pending.svg"
        count={appointments.pendingAppointments}
        label="Total number of pending appointments"
      />
      <StatCard
        type="cancelled"
        icon="/assets/icons/cancelled.svg"
        count={appointments.cancelledAppointments}
        label="Total number of cancelled appointments"
      />
    </section>
  );
};

export default StatCards;
