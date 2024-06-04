"use client";

import {
  type ForwardRefExoticComponent,
  type PropsWithoutRef,
  type SVGProps,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";

export function SidebarNavigationItem({
  name,
  href,
  isExact = false,
  Icon,
}: {
  name: string;
  href: string;
  isExact?: boolean;
  Icon: ForwardRefExoticComponent<PropsWithoutRef<SVGProps<SVGSVGElement>>>;
}) {
  const pathname = usePathname();

  const isCurrent = isExact ? pathname === href : pathname.includes(href);
  return (
    <Link
      href={href}
      className={cn(
        isCurrent
          ? "bg-indigo-700 text-white"
          : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
      )}
    >
      <Icon
        className={cn(
          isCurrent ? "text-white" : "text-indigo-200 group-hover:text-white",
          "h-6 w-6 shrink-0",
        )}
        aria-hidden="true"
      />
      {name}
    </Link>
  );
}
