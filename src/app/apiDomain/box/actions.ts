"use server";

import { type BoxTranslation, type Box } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { db } from "@/server/db";
import { DEFAULT_LOCALE } from "@/constants";
import { authOptions } from "@/server/auth";

export interface CreateBoxPayload
  extends Omit<Box, "updatedAt" | "createdAt" | "id" | "createdById"> {
  name: string;
  description: string;
}
export type UpdateBoxPayload = Omit<
  Box,
  "updatedAt" | "createdAt" | "createdById"
>;

export interface UpsertBoxTranslationPayload
  extends Omit<BoxTranslation, "updatedAt" | "createdAt" | "id"> {
  id?: string;
}

export async function createBox(data: CreateBoxPayload) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return undefined;
  }

  const { name, description, ...boxData } = data;

  try {
    const response = await db.box.create({
      data: {
        ...boxData,
        createdById: session.user.id,
        BoxTranslation: {
          create: {
            name,
            description,
            locale: {
              connect: {
                code: DEFAULT_LOCALE,
              },
            },
          },
        },
      },
    });
    revalidatePath("/dashboard/boxes", "page");

    return response;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function updateBox(data: UpdateBoxPayload) {
  try {
    const response = await db.box.update({
      where: { id: data.id },
      data,
    });
    revalidatePath("/dashboard/boxes", "page");

    return response;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function upsertBoxTranslation(data: UpsertBoxTranslationPayload) {
  const { id, ...translationData } = data;

  try {
    return await db.boxTranslation.upsert({
      where: {
        id: id ?? undefined,
        boxId_localeCode: {
          boxId: translationData.boxId,
          localeCode: translationData.localeCode,
        },
      },
      update: translationData,
      create: translationData,
    });
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
