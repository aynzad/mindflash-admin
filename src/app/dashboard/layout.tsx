import { getServerSession } from "next-auth";

import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { authOptions } from "@/server/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return (
    <>
      <div>
        <Sidebar />

        <div className="lg:pl-72">
          <Header user={session.user} />

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
