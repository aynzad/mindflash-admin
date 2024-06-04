"use server";

import { type Status } from "@prisma/client";

import { db } from "@/server/db";
import { DEFAULT_LOCALE } from "@/constants";

const boxConnections = {
  BoxTranslation: {
    select: {
      name: true,
      description: true,
      downloadCount: true,
      localeCode: true,
    },
  },
  createdBy: {
    select: { name: true, email: true },
  },
  category: {
    select: {
      id: true,
      CategoryTranslation: {
        select: { name: true, localeCode: true },
        where: { localeCode: DEFAULT_LOCALE },
      },
    },
  },
};

export async function getBox(id: string) {
  try {
    const box = await db.box.findFirst({
      where: { id },
      include: boxConnections,
    });

    return box ?? undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
export type BoxWithConnections = NonNullable<
  Awaited<ReturnType<typeof getBox>>
>;

export async function getBoxes<R = BoxWithConnections>({
  select,
  status,
}: {
  select?: (box: BoxWithConnections) => R;
  status?: Status;
}): Promise<R[]> {
  try {
    const boxes = await db.box.findMany({
      where: status ? { status } : undefined,
      orderBy: {
        createdAt: "desc",
      },
      include: boxConnections,
    });

    return select ? boxes.map(select) : (boxes as unknown as R[]);
  } catch (e) {
    console.error(e);
    return [];
  }
}
export type BoxesWithConnections<R = BoxWithConnections> = Awaited<
  ReturnType<typeof getBoxes<R>>
>;

export async function getBoxTranslation(id: string, localeCode: string) {
  try {
    const translation = await db.boxTranslation.findFirst({
      where: { boxId: id, localeCode },
    });

    return translation ?? undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
