import { notFound } from "next/navigation";
import { type Locale } from "@prisma/client";

import { UpsertBoxTranslationForm } from "@/components/forms/UpsertBoxTranslation";
import { type BoxWithConnections, getBox } from "@/app/apiDomain/box/queries";
import { DEFAULT_LOCALE } from "@/constants";
import { PageLayout } from "@/components/page/PageLayout";
import { getLocales } from "@/app/apiDomain/locale/queries";

function getTranslation(
  boxId: string,
  box: BoxWithConnections,
  locale: Locale,
) {
  const translate = box.BoxTranslation.find(
    (item) => item.localeCode === locale.code,
  );

  if (!translate) {
    return undefined;
  }

  const { name, localeCode, ...rest } = translate;

  if (!name || !localeCode) {
    undefined;
  }

  return {
    name,
    localeCode,
    boxId,
    ...rest,
  };
}

export default async function Box({
  params: { id },
}: {
  params: { id: string };
}) {
  const locales = await getLocales({});
  const box = await getBox(id);

  const boxName =
    box?.BoxTranslation.find((item) => item.localeCode === DEFAULT_LOCALE)
      ?.name ?? "";

  if (!box) {
    return notFound();
  }

  return (
    <PageLayout title={`"${boxName}" box`} description="Box translations">
      <div className="space-y-12">
        {locales.map((locale) => (
          <UpsertBoxTranslationForm
            key={locale.code}
            boxId={id}
            locale={locale}
            translation={getTranslation(id, box, locale)}
          />
        ))}
      </div>
    </PageLayout>
  );
}
