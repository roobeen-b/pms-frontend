import LoginForm from "@/components/forms/LoginForm";
import PassKeyModal from "@/components/PassKeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Login({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PassKeyModal />}
      <section className="container remove-scrollbar">
        <div className="sub-container max-w-[496px]">
          <Link href="/">
            <Image
              src={"/assets/icons/logo-full.svg"}
              alt="Logo"
              width={1000}
              height={1000}
              className="h-10 mb-8 w-fit"
            />
          </Link>
          <LoginForm />
          <div className="text-14-regular text-dark-700 py-10 flex justify-between">
            <p>
              Don't have an account ?{"  "}
              <Link href="/signup" className="text-green-500">
                Sign Up
              </Link>
            </p>
            {/* <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link> */}
          </div>
          <p className="justify-items-end text-dark-600 xl:text-left">
            © {new Date().getFullYear()} Patient Plus
          </p>
        </div>
      </section>
      <Image
        src={"/assets/images/onboarding-img.png"}
        alt="Onboarding image"
        width={1000}
        height={1000}
        className="max-w-[50%] side-img"
      />
    </div>
  );
}
