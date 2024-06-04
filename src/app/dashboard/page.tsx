import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";

import { authOptions } from "@/server/auth";
import { PageLayout } from "@/components/page/PageLayout";

async function Dashboard() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session?.user;

  if (!isLoggedIn) {
    return redirect("/login");
  }

  return (
    <PageLayout
      title="Dashboard"
      description="manage the app"
      buttonTitle="Create Box"
      buttonHref="/dashboard/boxes/create"
    >
      <Image
        className="mx-auto my-20 h-64 w-64"
        src="/assets/icon-dark.png"
        alt="dashboard"
        width={512}
        height={512}
      />
      <h1 className="text-brand -mt-20 text-center text-6xl font-bold">
        Mind Flash
      </h1>
    </PageLayout>
  );
}

export default Dashboard;
