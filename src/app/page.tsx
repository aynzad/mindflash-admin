import { getServerSession } from "next-auth";
import Link from "next/link";

import { authOptions } from "@/server/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session?.user;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          MindFlash Admin Panel
        </h1>
        <p className="text-center text-lg">
          Welcome to the MindFlash Admin Panel. Here you can manage all the
          data.
        </p>

        <div className="flex flex-col items-center gap-4">
          {isLoggedIn ? (
            <Link href="/dashboard">
              <button className="button button__primary">
                Go to Dashboard
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button className="button button__primary">
                Log in to get started
              </button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
