import { headers } from "next/headers";
import { Status } from "@prisma/client";

import { isValidApiAccount } from "@/app/apiDomain/apiAccount/queries";
import { db } from "@/server/db";

const MAX_LIMIT = 100;

export async function GET(request: Request) {
  const headersList = headers();
  const apiKey = headersList.get("api_key");
  if (!apiKey) {
    return Response.json({ message: "API key is required" }, { status: 401 });
  }

  const { isValid, message } = await isValidApiAccount(apiKey);
  if (!isValid) {
    return Response.json({ message }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") ?? `${MAX_LIMIT}`);

  const locales = await db.locale.findMany({
    where: { status: Status.ACTIVE },
    orderBy: {
      name: "asc",
    },
    select: {
      name: true,
      code: true,
    },
    take: limit,
  });

  return Response.json({ locales });
}
