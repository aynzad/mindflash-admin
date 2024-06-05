"use server";

import { type CardTranslation, type Card } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { db } from "@/server/db";
import { DEFAULT_LOCALE } from "@/constants";
import { authOptions } from "@/server/auth";

export interface CreateCardPayload
  extends Omit<Card, "updatedAt" | "createdAt" | "id" | "createdById"> {
  textFront: string;
  textBack: string;
}
export type UpdateCardPayload = Omit<
  Card,
  "updatedAt" | "createdAt" | "createdById"
>;

export interface UpsertCardTranslationPayload
  extends Omit<CardTranslation, "updatedAt" | "createdAt" | "id"> {
  id?: string;
}

export async function createCard(data: CreateCardPayload) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return undefined;
  }

  const { textFront, textBack, ...cardData } = data;

  try {
    const response = await db.card.create({
      data: {
        ...cardData,
        createdById: session.user.id,
        CardTranslation: {
          create: {
            textFront,
            textBack,
            locale: {
              connect: {
                code: DEFAULT_LOCALE,
              },
            },
          },
        },
      },
    });
    revalidatePath(`/dashboard/boxes/${data.boxId}/cards`, "page");

    return response;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function updateCard(data: UpdateCardPayload) {
  try {
    const response = await db.card.update({
      where: { id: data.id },
      data,
    });
    revalidatePath(`/dashboard/boxes/${data.boxId}/cards`, "page");

    return response;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function upsertCardTranslation(
  data: UpsertCardTranslationPayload,
) {
  const { id, ...translationData } = data;

  try {
    return await db.cardTranslation.upsert({
      where: {
        id: id ?? undefined,
        cardId_localeCode: {
          cardId: translationData.cardId,
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
