"use server";

import { type Locale } from "@prisma/client";

import { db } from "@/server/db";

export async function upsertLocale(data: Locale) {
  const normalizedData = {
    ...data,
    code: data.code.toLowerCase(),
  };

  try {
    return await db.locale.upsert({
      where: { code: normalizedData.code },
      update: normalizedData,
      create: normalizedData,
    });
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
