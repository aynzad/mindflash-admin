import { notFound } from "next/navigation";
import { type Locale } from "@prisma/client";

import {
  type CategoryWithConnections,
  getCategory,
} from "@/app/apiDomain/category/queries";
import { DEFAULT_LOCALE } from "@/constants";
import { PageLayout } from "@/components/page/PageLayout";
import { getLocales } from "@/app/apiDomain/locale/queries";
import { UpsertCategoryTranslationForm } from "@/components/forms/UpsertCategoryTranslation";

function getTranslation(
  categoryId: string,
  category: CategoryWithConnections,
  locale: Locale,
) {
  const translate = category.CategoryTranslation.find(
    (item) => item.localeCode === locale.code,
  );

  if (!translate) {
    return undefined;
  }

  const { name, localeCode } = translate;

  if (!name || !localeCode) {
    undefined;
  }

  return {
    name,
    localeCode,
    categoryId,
  };
}

export default async function Category({
  params: { id },
}: {
  params: { id: string };
}) {
  const locales = await getLocales({});
  const category = await getCategory(id);

  const categoryName =
    category?.CategoryTranslation.find(
      (item) => item.localeCode === DEFAULT_LOCALE,
    )?.name ?? "";

  if (!category) {
    return notFound();
  }

  return (
    <PageLayout
      title={`"${categoryName}" category`}
      description="Category translations"
    >
      <div className="space-y-12">
        {locales.map((locale) => (
          <UpsertCategoryTranslationForm
            key={locale.code}
            categoryId={id}
            locale={locale}
            translation={getTranslation(id, category, locale)}
          />
        ))}
      </div>
    </PageLayout>
  );
}
