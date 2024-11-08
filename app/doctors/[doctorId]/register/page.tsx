import DoctorInfoForm from "@/components/forms/DoctorInfoForm";
import { getAllSpecialties } from "@/lib/actions/specialty.actions";
import Image from "next/image";
import Link from "next/link";

const DoctorRegister = async ({ params: { doctorId } }: SearchParamProps) => {
  const allSpecialties = await getAllSpecialties();

  return (
    <div className="flex h-screen max-h-screen">
      <section className="container remove-scrollbar">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Link href="/">
            <Image
              src={"/assets/icons/logo-full.svg"}
              alt="Logo"
              width={1000}
              height={1000}
              className="h-10 mb-8 w-fit"
            />
          </Link>
          <DoctorInfoForm
            isEdit={false}
            doctorId={doctorId}
            specialties={allSpecialties.data}
          />
          <p className="justify-items-end text-dark-600 xl:text-left">
            © {new Date().getFullYear()} Patient Plus
          </p>
        </div>
      </section>
      <Image
        src={"/assets/images/register-img.png"}
        alt="Onboarding image"
        width={1000}
        height={1000}
        className="max-w-[390px] side-img"
      />
    </div>
  );
};

export default DoctorRegister;
