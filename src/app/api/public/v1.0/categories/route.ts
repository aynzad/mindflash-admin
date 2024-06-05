import { headers } from "next/headers";
import { Status } from "@prisma/client";

import { isValidApiAccount } from "@/app/apiDomain/apiAccount/queries";
import { db } from "@/server/db";
import { DEFAULT_LOCALE } from "@/constants";

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
  const extraLocale = searchParams.get("locale");

  if (extraLocale && extraLocale !== "") {
    const locale = await db.locale.findFirst({
      where: { code: extraLocale },
    });

    if (!locale) {
      return Response.json({ message: "Locale is not valid" }, { status: 400 });
    }
  }

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
