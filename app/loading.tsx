import Image from "next/image";

const loading = () => {
  return (
    <div className="h-screen flex items-center justify-center gap-4">
      <Image
        src="/assets/icons/loader.svg"
        alt="loader"
        height={24}
        width={24}
        className="animate-spin"
      />
      Loading ...
    </div>
  );
};

export default loading;
