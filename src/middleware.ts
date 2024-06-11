import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { isValidApiAccount } from "./app/apiDomain/apiAccount/queries";
import { db } from "./server/db";

export async function middleware(request: NextRequest) {
  //   Checking if the API key is valid
  console.log("middleware");
  const headersList = headers();
  const apiKey = headersList.get("api_key");
  if (!apiKey) {
    return NextResponse.json(
      { message: "API key is required" },
      { status: 403 },
    );
  }

  const { isValid, message } = await isValidApiAccount(apiKey);

  if (!isValid) {
    return Response.json({ message }, { status: 403 });
  }

  // Checking if the locale is valid
  const { searchParams } = new URL(request.url);
  const extraLocale = searchParams.get("locale");

  if (extraLocale && extraLocale !== "") {
    const locale = await db.locale.findFirst({
      where: { code: extraLocale },
    });

    if (!locale) {
      return Response.json({ message: "Locale is not valid" }, { status: 400 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/public/(.*)",
};
