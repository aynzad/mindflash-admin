import { Status } from "@prisma/client";

import { db } from "@/server/db";
import { DEFAULT_LOCALE } from "@/constants";

const MAX_LIMIT = 100;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") ?? `${MAX_LIMIT}`);
  const extraLocale = searchParams.get("locale");

  const locales =
    extraLocale && extraLocale !== DEFAULT_LOCALE
      ? [DEFAULT_LOCALE, extraLocale]
      : [DEFAULT_LOCALE];

  const categories = await db.category.findMany({
    where: { status: Status.ACTIVE },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      CategoryTranslation: {
        select: {
          name: true,
          localeCode: true,
        },
        where: {
          localeCode: {
            in: locales,
          },
        },
      },
    },
    take: limit,
  });

  return Response.json({ categories });
}
