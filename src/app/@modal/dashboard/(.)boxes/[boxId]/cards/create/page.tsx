import { getBox } from "@/app/apiDomain/box/queries";
import { CreateCardForm } from "@/components/forms/CreateCardForm";
import { Modal } from "@/components/modal/Modal";
import { DEFAULT_LOCALE } from "@/constants";

export default async function CreateCardModal({
  params: { boxId },
}: {
  params: { boxId: string };
}) {
  const box = await getBox(boxId);

  const boxName =
    box?.BoxTranslation.find((item) => item.localeCode === DEFAULT_LOCALE)
      ?.name ?? "-";

  return (
    <Modal title={`Create card - ${boxName}`}>
      <CreateCardForm boxId={boxId} isModal />
    </Modal>
  );
}
