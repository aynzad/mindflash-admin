import { notFound } from "next/navigation";

import { UpdateBoxForm } from "@/components/forms/UpdateBoxForm";
import { getBox } from "@/app/apiDomain/box/queries";
import { DEFAULT_LOCALE } from "@/constants";
import { PageLayout } from "@/components/page/PageLayout";
import { getCategories } from "@/app/apiDomain/category/queries";

export default async function EditBox({
  params: { boxId },
}: {
  params: { boxId: string };
}) {
  const categories = await getCategories({});
  const box = await getBox(boxId);

  const boxName =
    box?.BoxTranslation.find((item) => item.localeCode === DEFAULT_LOCALE)
      ?.name ?? "";

  if (!box) {
    return notFound();
  }

  return (
    <PageLayout
      title={`Edit "${boxName}" box`}
      description="Edit box information"
    >
      <UpdateBoxForm box={box} boxName={boxName} categories={categories} />
    </PageLayout>
  );
}
