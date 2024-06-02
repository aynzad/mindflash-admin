import { notFound } from "next/navigation";

import { PageLayout } from "@/components/page/PageLayout";
import { UpsertLocaleForm } from "@/components/forms/UpsertLocaleForm";
import { getLocale } from "@/app/apiDomain/locale/queries";

export default async function EditLocale({
  params: { code },
}: {
  params: { code: string };
}) {
  const locale = await getLocale(code);

  if (!locale) {
    return notFound();
  }

  return (
    <PageLayout
      title={`Edit "${code.toUpperCase()}" locale`}
      description="Edit locale information"
    >
      <UpsertLocaleForm locale={locale} />
    </PageLayout>
  );
}
