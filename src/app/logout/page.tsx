import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Logout from "./Logout";
import { authOptions } from "@/server/auth";

async function LogoutPage() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session?.user;

  if (!isLoggedIn) {
    return redirect("/");
  }

  return <Logout />;
}

export default LogoutPage;
