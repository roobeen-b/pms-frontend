"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="bg-dark-300 flex items-center gap-2 outline outline-1"
    >
      <Image
        src="/assets/icons/back-arrow.svg"
        width={24}
        height={24}
        alt="Back Button"
      />
      Back
    </Button>
  );
};

export default BackButton;
