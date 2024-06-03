import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";

import { authOptions } from "@/server/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session?.user;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#6549e1] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Image
          src="/assets/logo.png"
          alt="MindFlash Logo"
          width={200}
          height={200}
        />
        <h1 className="-mb-10 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          MindFlash
        </h1>
        <p className="text-center text-lg">Remembering things made easy</p>

        <div className="flex flex-col items-center gap-4">
          {isLoggedIn ? (
            <Link href="/dashboard">
              <button className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
                Go to Dashboard
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
                Log in to dashboard
              </button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
