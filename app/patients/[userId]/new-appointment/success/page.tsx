import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );

  return (
    <div className="h-screen max-h-screen">
      <div className="flex flex-col items-center py-10 m-auto">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            width={1000}
            height={1000}
            className="h-10 mb-12 w-fit"
          />
        </Link>

        <div className="flex flex-col items-center mb-2">
          <Image
            src="/assets/gifs/success.gif"
            alt="success image"
            width={1000}
            height={1000}
            className="h-30 w-fit"
          />

          <h1 className="header max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h1>
          <p className="text-dark-700 mt-6">
            We'll be in touch shortly to confirm.
          </p>
        </div>

        <section className="request-details">
          <p>Requested appointment details:</p>
          <div className="flex items-center gap-4">
            <Image
              src={doctor?.image!}
              height={24}
              width={24}
              alt="Doctor's image"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>

          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button className="shad-primary-btn mt-2" variant="outline">
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright mt-2">
          &copy; {new Date().getFullYear()} Patient Plus
        </p>
      </div>
    </div>
  );
};

export default Success;
