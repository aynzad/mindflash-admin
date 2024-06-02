"use client";

import {
  ArchiveBoxIcon,
  TagIcon,
  HomeIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";

import { SidebarNavigationItem } from "./SidebarNavigationItem";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, isExact: true },
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: TagIcon,
  },
  {
    name: "Boxes",
    href: "/dashboard/boxes",
    icon: ArchiveBoxIcon,
  },
  {
    name: "Locales",
    href: "/dashboard/locales",
    icon: LanguageIcon,
  },
];

export function SidebarNavigation() {
  return (
    <ul role="list" className="-mx-2 space-y-1">
      {navigation.map(({ name, href, icon, isExact }) => (
        <li key={name}>
          <SidebarNavigationItem
            name={name}
            href={href}
            Icon={icon}
            isExact={isExact}
          />
        </li>
      ))}
    </ul>
  );
}
