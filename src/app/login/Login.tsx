"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex h-full flex-col justify-center self-center">
      <div className="mx-auto -mt-32 pb-6 text-center md:max-w-3xl 2xl:w-full">
        <a className="flex justify-center" href="/">
          MindFlash
        </a>
        <h1 className="page-title">LGN</h1>
        <h6 className="text-primary-lighter text-base font-normal leading-8 md:text-xl">
          Login to the most powerful abbreviation search engine to help a
          colleague to relief from googling or searching abbreviations.
        </h6>
      </div>
      <div className="flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="mx-auto sm:w-full sm:max-w-sm">
          <div className="mx-2 rounded-sm px-4 py-4 sm:px-10">
            <section className="mt-4 text-center">
              <div className="grid grid-cols-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    void signIn("google");
                  }}
                  className="button button__secondary inline-flex space-x-2"
                >
                  <Image
                    className="h-6 w-6"
                    width={24}
                    height={24}
                    src="/assets/google.svg"
                    alt="google login"
                  />
                  <p className="text-primary-darken">Sign in with Google</p>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
