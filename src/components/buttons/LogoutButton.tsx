"use client";

import { signOut } from "next-auth/react";

export const LogoutButton = () => (
  <a
    onClick={(e) => {
      e.preventDefault();
      void signOut({ callbackUrl: "/" });
    }}
    className="block cursor-pointer px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50"
  >
    Logout
  </a>
);
