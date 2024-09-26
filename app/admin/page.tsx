import AdminMain from "@/components/AdminMain";
import { getRecentAppointments } from "@/lib/actions/appointment.actions";

const AdminPage = async () => {
  const appointments = await getRecentAppointments();

  return <AdminMain appointments={appointments} />;
};

export default AdminPage;
