import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { type User } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import MenuItems from "@/components/lib/MenuItems";
import MenuItem from "@/components/lib/MenuItem";
import MenuButton from "@/components/lib/MenuButton";
import Transition from "@/components/lib/Transition";
import Menu from "@/components/lib/Menu";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Log out", href: "/logout" },
];

export function PageTopBar({ user }: { user: User }) {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div id="page-title-root" className="flex flex-1" />
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <Image
                width={32}
                height={32}
                className="h-8 w-8 rounded-full bg-gray-50"
                src={user.image ?? ""}
                alt={user.name ?? "user image"}
              />
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  {user.name}
                </span>
                <ChevronDownIcon
                  className="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </MenuButton>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                {userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  </MenuItem>
                ))}
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
