"use server";

import { type Locale } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/server/db";

export async function upsertLocale(data: Locale) {
  const normalizedData = {
    ...data,
    code: data.code.toLowerCase(),
  };

  try {
    const response = await db.locale.upsert({
      where: { code: normalizedData.code },
      update: normalizedData,
      create: normalizedData,
    });
    revalidatePath("/dashboard/locales", "page");

    return response;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
