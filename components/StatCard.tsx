import clsx from "clsx";
import Image from "next/image";

type StatCardProps = {
  icon: string;
  count: number;
  type: "scheduled" | "pending" | "cancelled";
  label: string;
};

const StatCard = ({ icon, count = 0, type, label }: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card flex flex-col", {
        "bg-appointments": type === "scheduled",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex gap-4 items-center">
        <Image
          src={icon}
          alt={type}
          width={32}
          height={32}
          className="w-fit size-8"
        />
        <p className="text-32-bold">{count}</p>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  );
};

export default StatCard;
