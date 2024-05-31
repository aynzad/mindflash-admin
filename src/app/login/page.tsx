import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Login from "./Login";
import { authOptions } from "@/server/auth";

async function LoginPage() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session?.user;

  if (isLoggedIn) {
    return redirect("/");
  }

  return <Login />;
}

export default LoginPage;
