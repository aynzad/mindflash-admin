/* eslint-disable @next/next/no-img-element */
"use client";

import { signIn } from "next-auth/react";

export const LoginButton = () => (
  <button
    onClick={() => {
      void signIn("google", { callbackUrl: "/dashboard" });
    }}
    className="flex items-center space-x-2 rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-gray-300 shadow-sm hover:bg-white/20"
  >
    <img className="h-6 w-6" src="/assets/google.svg" alt="google" />
    <span>Login with Google</span>
  </button>
);
