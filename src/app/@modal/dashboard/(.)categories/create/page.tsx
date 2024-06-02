import { CreateCategoryForm } from "@/components/forms/CreateCategoryForm";
import { Modal } from "@/components/modal/Modal";

export default async function CreateCategoryModal() {
  return (
    <Modal title="Create a category">
      <CreateCategoryForm isModal />
    </Modal>
  );
}
