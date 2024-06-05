import { getCategories } from "@/app/apiDomain/category/queries";
import { CreateBoxForm } from "@/components/forms/CreateBoxForm";
import { Modal } from "@/components/modal/Modal";

export default async function CreateBoxModal() {
  const categories = await getCategories({});

  return (
    <Modal title="Create a box">
      <CreateBoxForm categories={categories} isModal />
    </Modal>
  );
}
