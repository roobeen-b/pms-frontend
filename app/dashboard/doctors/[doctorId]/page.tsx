"use client";

import { Button } from "@/components/ui/button";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getDoctorById } from "@/lib/actions/doctor.actions";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DoctorDetail = () => {
  const [doctor, setDoctor] = useState<DoctorInfo>();
  const { token } = useLocalStorage();
  const params = useParams();
  const router = useRouter();

  const doctorId = params.doctorId as string;

  useEffect(() => {
    if (!token) return;
    const fetchDoctor = async () => {
      try {
        const res = await getDoctorById(token, doctorId);
        if (res && res.status === 200) {
          setDoctor(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctor();
  }, [token]);

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="sub-header">Dr. {doctor?.fullname}</h1>
          <p>{doctor?.specialty}</p>
        </div>
        <div>
          <Button
            variant="ghost"
            className={`capitalize text-green-400`}
            onClick={() =>
              router.push(
                `/dashboard/appointments/new-appointment?doctor=${doctor?.fullname}`
              )
            }
          >
            Schedule Appointment
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          src={
            process.env.NEXT_PUBLIC_IMAGE_URL + "doctors/" + doctor?.doctorPhoto
          }
          width={100}
          height={100}
          alt="Doctor's image"
          className="border border-dark-500 rounded-full w-48 h-48"
        />
      </div>
      <p className="flex justify-center mt-4">{doctor?.doctorDesc}</p>
    </div>
  );
};

export default DoctorDetail;
