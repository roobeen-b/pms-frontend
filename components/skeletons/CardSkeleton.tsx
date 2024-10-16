import Image from "next/image";

const CardSkeleton = () => {
  return (
    <div className="stat-card flex flex-col animate-pulse bg-gray-700">
      <div className="flex gap-4 items-center">
        <Image
          src="/assets/icons/image.svg"
          alt="skeleton image"
          width={32}
          height={32}
          className="w-fit size-8 bg-gray-200 dark:bg-gray-800"
        />
      </div>
      <div className="h-2 w-64 mt-4 bg-gray-200 rounded-full dark:bg-gray-800"></div>
    </div>
  );
};

export default CardSkeleton;
