import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { Sidebar } from "@/components/sidebar/Sidebar";
import { PageTopBar } from "@/components/page/PageTopBar";
import { authOptions } from "@/server/auth";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/");
  }

  return (
    <>
      <div>
        <Sidebar />

        <div className="lg:pl-72">
          <PageTopBar user={session.user} />

          <main className="py-4">
            <div className="px-4 sm:px-6 lg:px-8">{props.children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
