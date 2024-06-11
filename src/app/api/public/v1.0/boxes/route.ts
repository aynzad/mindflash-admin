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

  const boxes = await db.box.findMany({
    where: { status: Status.ACTIVE },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      downloadCount: true,
      BoxTranslation: {
        select: {
          name: true,
          description: true,
          localeCode: true,
        },
        where: {
          localeCode: {
            in: locales,
          },
        },
      },
      Card: {
        select: {
          id: true,
          CardTranslation: {
            select: { textFront: true, textBack: true, localeCode: true },
            where: {
              localeCode: {
                in: locales,
              },
            },
          },
        },
      },
      createdBy: {
        select: { name: true },
      },
      category: {
        select: {
          id: true,
          CategoryTranslation: {
            select: { name: true, localeCode: true },
            where: {
              localeCode: {
                in: locales,
              },
            },
          },
        },
      },
      _count: {
        select: { Card: true },
      },
    },
    take: limit,
  });

  return Response.json({ boxes });
}
