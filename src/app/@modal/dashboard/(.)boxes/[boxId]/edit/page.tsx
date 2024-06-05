import { UpdateBoxForm } from "@/components/forms/UpdateBoxForm";
import { getBox } from "@/app/apiDomain/box/queries";
import { Modal } from "@/components/modal/Modal";
import { DEFAULT_LOCALE } from "@/constants";
import { getCategories } from "@/app/apiDomain/category/queries";

export default async function EditBoxModal({
  params: { boxId },
}: {
  params: { boxId: string };
}) {
  const categories = await getCategories({});
  const box = await getBox(boxId);

  const boxName =
    box?.BoxTranslation.find((item) => item.localeCode === DEFAULT_LOCALE)
      ?.name ?? "";

  return (
    <Modal title={`Edit "${boxName}" box`}>
      {box ? (
        <UpdateBoxForm
          box={box}
          boxName={boxName}
          categories={categories}
          isModal
        />
      ) : (
        <div>Box not found</div>
      )}
    </Modal>
  );
}
