import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/server/auth";

async function Dashboard() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session?.user;

  if (!isLoggedIn) {
    return redirect("/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
