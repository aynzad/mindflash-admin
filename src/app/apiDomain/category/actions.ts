"use server";

import { type CategoryTranslation, type Category } from "@prisma/client";
import { getServerSession } from "next-auth";

import { db } from "@/server/db";
import { DEFAULT_LOCALE } from "@/constants";
import { authOptions } from "@/server/auth";

export interface CreateCategoryPayload
  extends Omit<Category, "updatedAt" | "createdAt" | "id" | "createdById"> {
  name: string;
}
export type UpdateCategoryPayload = Omit<
  Category,
  "updatedAt" | "createdAt" | "createdById"
>;

export interface UpsertCategoryTranslationPayload
  extends Omit<CategoryTranslation, "updatedAt" | "createdAt" | "id"> {
  id?: string;
}

export async function createCategory(data: CreateCategoryPayload) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return undefined;
  }

  const { name, ...categoryData } = data;

  try {
    return await db.category.create({
      data: {
        ...categoryData,
        createdById: session.user.id,
        CategoryTranslation: {
          create: {
            name,
            locale: {
              connect: {
                code: DEFAULT_LOCALE,
              },
            },
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function updateCategory(data: UpdateCategoryPayload) {
  try {
    return await db.category.update({
      where: { id: data.id },
      data,
    });
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function upsertCategoryTranslation(
  data: UpsertCategoryTranslationPayload,
) {
  const { id, ...translationData } = data;

  try {
    return await db.categoryTranslation.upsert({
      where: {
        id: id ?? undefined,
        categoryId_localeCode: {
          categoryId: translationData.categoryId,
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
