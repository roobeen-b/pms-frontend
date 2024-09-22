import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="container remove-scrollbar">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src={"/assets/icons/logo-full.svg"}
            alt="Logo"
            width={1000}
            height={1000}
            className="h-10 mb-12 w-fit"
          />
          <RegisterForm user={user} />
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

export default Register;
