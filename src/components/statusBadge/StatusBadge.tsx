import { Status } from "@prisma/client";
import cn from "classnames";

export function StatusBadge({
  status,
  classNames = "",
}: {
  status: Status;
  classNames?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block min-w-20 rounded-full px-2.5 py-0.5 text-center text-xs font-medium",
        status === Status.ACTIVE && "bg-blue-500 text-blue-100",
        status === Status.DISABLED && "bg-red-500 text-red-100",
        status === Status.PENDING && "bg-lime-500 text-lime-800",
        classNames,
      )}
    >
      {status}
    </span>
  );
}
