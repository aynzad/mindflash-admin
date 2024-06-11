import { Status } from "@prisma/client";

import { db } from "@/server/db";

const MAX_LIMIT = 100;

export async function GET(request: Request) {
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
