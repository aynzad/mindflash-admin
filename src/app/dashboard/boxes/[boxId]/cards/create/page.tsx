import { getBox } from "@/app/apiDomain/box/queries";
import { CreateCardForm } from "@/components/forms/CreateCardForm";
import { PageLayout } from "@/components/page/PageLayout";
import { DEFAULT_LOCALE } from "@/constants";

export default async function CreateCard({
  params: { boxId },
}: {
  params: { boxId: string };
}) {
  const box = await getBox(boxId);

  const boxName =
    box?.BoxTranslation.find((item) => item.localeCode === DEFAULT_LOCALE)
      ?.name ?? "-";

  return (
    <PageLayout
      title={`Create card - ${boxName}`}
      description={`Create new card in the "${boxName}" box`}
    >
      <CreateCardForm boxId={boxId} />
    </PageLayout>
  );
}
