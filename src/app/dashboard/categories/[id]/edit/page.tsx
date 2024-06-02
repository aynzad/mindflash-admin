import { notFound } from "next/navigation";

import { UpdateCategoryForm } from "@/components/forms/UpdateCategoryForm";
import { getCategory } from "@/app/apiDomain/category/queries";
import { DEFAULT_LOCALE } from "@/constants";
import { PageLayout } from "@/components/page/PageLayout";

export default async function EditCategory({
  params: { id },
}: {
  params: { id: string };
}) {
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
      title={`Edit "${categoryName}" category`}
      description="Edit category information"
    >
      <UpdateCategoryForm category={category} categoryName={categoryName} />
    </PageLayout>
  );
}
