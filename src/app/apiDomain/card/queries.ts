"use server";

import { type Status } from "@prisma/client";

import { db } from "@/server/db";
import { DEFAULT_LOCALE } from "@/constants";

const cardConnections = {
  CardTranslation: {
    select: {
      textFront: true,
      textBack: true,
      localeCode: true,
    },
  },
  createdBy: {
    select: { name: true, email: true },
  },
  box: {
    select: {
      id: true,
      BoxTranslation: {
        select: { name: true, localeCode: true },
        where: { localeCode: DEFAULT_LOCALE },
      },
    },
  },
};

export async function getCard(id: string) {
  try {
    const card = await db.card.findFirst({
      where: { id },
      include: cardConnections,
    });

    return card ?? undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
export type CardWithConnections = NonNullable<
  Awaited<ReturnType<typeof getCard>>
>;

export async function getCards<R = CardWithConnections>({
  boxId,
  select,
  status,
}: {
  boxId: string;
  select?: (card: CardWithConnections) => R;
  status?: Status;
}): Promise<R[]> {
  try {
    const cards = await db.card.findMany({
      where: status ? { boxId, status } : { boxId },
      orderBy: {
        createdAt: "desc",
      },
      include: cardConnections,
    });

    return select ? cards.map(select) : (cards as unknown as R[]);
  } catch (e) {
    console.error(e);
    return [];
  }
}
export type CardsWithConnections<R = CardWithConnections> = Awaited<
  ReturnType<typeof getCards<R>>
>;

export async function getCardTranslation(id: string, localeCode: string) {
  try {
    const translation = await db.cardTranslation.findFirst({
      where: { cardId: id, localeCode },
    });

    return translation ?? undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
