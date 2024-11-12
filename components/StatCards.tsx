import CardSkeletons from "./skeletons/CardSkeletons";
import StatCard from "./StatCard";

const StatCards = ({
  appointments,
  loading,
}: {
  appointments: AllCounts;
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
        count={appointments?.appointmentCount.scheduledAppointments}
        label="Total number of scheduled appointments"
      />
      <StatCard
        type="pending"
        icon="/assets/icons/pending.svg"
        count={appointments?.appointmentCount.pendingAppointments}
        label="Total number of pending appointments"
      />
      <StatCard
        type="cancelled"
        icon="/assets/icons/cancelled.svg"
        count={appointments?.appointmentCount.cancelledAppointments}
        label="Total number of cancelled appointments"
      />
    </section>
  );
};

export default StatCards;
