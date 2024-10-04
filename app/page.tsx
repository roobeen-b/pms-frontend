import PassKeyModal from "@/components/PassKeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PassKeyModal />}
      <section className="container remove-scrollbar my-auto">
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
          <div className="header">Welcome to Patient Plus</div>
          <p className="text-14-regular py-6">
            Say goodbye to scheduling chaos and hello to seamless appointment
            management. Our system is designed to simplify your booking process,
            ensuring you never miss an appointment again.
          </p>
          <h2 className="sub-header">Get Started Today!</h2>
          <p className="text-14-regular py-6">
            Join thousands of satisfied users who have transformed their
            scheduling experience. Sign up now and take control of your
            appointments.
          </p>
          <div className="text-14-regular text-dark-700 py-10 flex justify-between">
            <p>
              Have an account ?{"  "}
              <Link href="/login" className="text-green-500">
                Login
              </Link>
            </p>
            <p>
              Don&apos;t have an account ?{"  "}
              <Link href="/signup" className="text-green-500">
                Sign Up
              </Link>
            </p>
          </div>
          <div className="text-14-regular text-dark-700 py-10 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © {new Date().getFullYear()} Patient Plus
            </p>

            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
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
