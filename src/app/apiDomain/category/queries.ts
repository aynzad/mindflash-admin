"use server";

import { type Status } from "@prisma/client";

import { db } from "@/server/db";

const categoryConnections = {
  CategoryTranslation: {
    select: { name: true, localeCode: true },
  },
  createdBy: {
    select: { name: true, email: true },
  },
};

export async function getCategory(id: string) {
  try {
    const category = await db.category.findFirst({
      where: { id },
      include: categoryConnections,
    });

    return category ?? undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
export type CategoryWithTranslationAndCreatedBy = NonNullable<
  Awaited<ReturnType<typeof getCategory>>
>;

export async function getCategories<R = CategoryWithTranslationAndCreatedBy>({
  select,
  status,
}: {
  select?: (category: CategoryWithTranslationAndCreatedBy) => R;
  status?: Status;
}): Promise<R[]> {
  try {
    const categories = await db.category.findMany({
      where: status ? { status } : undefined,
      orderBy: {
        createdAt: "desc",
      },
      include: categoryConnections,
    });

    return select ? categories.map(select) : (categories as unknown as R[]);
  } catch (e) {
    console.error(e);
    return [];
  }
}
export type CategoriesWithTranslationAndCreatedBy<
  R = CategoryWithTranslationAndCreatedBy,
> = Awaited<ReturnType<typeof getCategories<R>>>;

export async function getCategoryTranslation(id: string, localeCode: string) {
  try {
    const translation = await db.categoryTranslation.findFirst({
      where: { categoryId: id, localeCode },
    });

    return translation ?? undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
