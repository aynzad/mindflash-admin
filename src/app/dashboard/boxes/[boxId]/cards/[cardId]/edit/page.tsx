import { notFound } from "next/navigation";

import { UpdateCardForm } from "@/components/forms/UpdateCardForm";
import { getBox } from "@/app/apiDomain/box/queries";
import { DEFAULT_LOCALE } from "@/constants";
import { PageLayout } from "@/components/page/PageLayout";
import { getCard } from "@/app/apiDomain/card/queries";

export default async function EditCard({
  params: { boxId, cardId },
}: {
  params: { boxId: string; cardId: string };
}) {
  const box = await getBox(boxId);
  const card = await getCard(cardId);

  const boxName =
    box?.BoxTranslation.find((item) => item.localeCode === DEFAULT_LOCALE)
      ?.name ?? "";

  const cardTextFront =
    card?.CardTranslation.find((item) => item.localeCode === DEFAULT_LOCALE)
      ?.textFront ?? "";

  const cardTextBack =
    card?.CardTranslation.find((item) => item.localeCode === DEFAULT_LOCALE)
      ?.textBack ?? "";

  if (!card || !box) {
    return notFound();
  }

  return (
    <PageLayout
      title={`Edit card in "${boxName}" box`}
      description="Edit card information"
    >
      <UpdateCardForm
        boxId={boxId}
        card={card}
        cardTextFront={cardTextFront}
        cardTextBack={cardTextBack}
      />
    </PageLayout>
  );
}
