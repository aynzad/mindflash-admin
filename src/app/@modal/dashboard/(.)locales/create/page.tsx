import { UpsertLocaleForm } from "@/components/forms/UpsertLocaleForm";
import { Modal } from "@/components/modal/Modal";

export default function CreateLocaleModal() {
  return (
    <Modal title="Create a locale">
      <UpsertLocaleForm isModal />
    </Modal>
  );
}
