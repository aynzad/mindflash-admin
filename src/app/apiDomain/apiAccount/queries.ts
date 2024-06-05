"use server";

import { Status } from "@prisma/client";

import { db } from "@/server/db";

export async function isValidApiAccount(apiKey: string) {
  try {
    const apiAccount = await db.apiAccount.findFirst({
      where: { apiKey },
    });

    if (!apiAccount) {
      return { isValid: false, message: "Invalid API key" };
    }

    if (apiAccount.status !== Status.ACTIVE) {
      return { isValid: false, message: "API account is not active" };
    }

    return { isValid: true, message: "API account is valid" };
  } catch (e) {
    console.error(e);
    return { isValid: true, message: "Invalid API key" };
  }
}
