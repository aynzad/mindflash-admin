import { UpdateCardForm } from "@/components/forms/UpdateCardForm";
import { getBox } from "@/app/apiDomain/box/queries";
import { Modal } from "@/components/modal/Modal";
import { DEFAULT_LOCALE } from "@/constants";
import { getCard } from "@/app/apiDomain/card/queries";

export default async function EditCardModal({
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

  return (
    <Modal title={`Edit card in "${boxName}" box`}>
      {box && card ? (
        <UpdateCardForm
          boxId={boxId}
          card={card}
          cardTextFront={cardTextFront}
          cardTextBack={cardTextBack}
          isModal
        />
      ) : (
        <div>Card not found</div>
      )}
    </Modal>
  );
}
