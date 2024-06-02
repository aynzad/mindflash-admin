"use server";

import { type Locale } from "@prisma/client";

import { db } from "@/server/db";

export async function getLocale(code: string) {
  try {
    const locale = await db.locale.findFirst({ where: { code } });

    return locale ?? undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function getLocales<R = Locale>({
  select,
}: {
  select?: (locale: Locale) => R;
}): Promise<R[]> {
  try {
    const locales = await db.locale.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return select ? locales.map(select) : (locales as unknown as R[]);
  } catch (e) {
    console.error(e);
    return [];
  }
}
