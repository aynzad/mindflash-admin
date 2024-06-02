import { UpdateCategoryForm } from "@/components/forms/UpdateCategoryForm";
import { getCategory } from "@/app/apiDomain/category/queries";
import { Modal } from "@/components/modal/Modal";
import { DEFAULT_LOCALE } from "@/constants";

export default async function EditCategoryModal({
  params: { id },
}: {
  params: { id: string };
}) {
  const category = await getCategory(id);

  const categoryName =
    category?.CategoryTranslation.find(
      (item) => item.localeCode === DEFAULT_LOCALE,
    )?.name ?? "";

  return (
    <Modal title={`Edit "${categoryName}" category`}>
      {category ? (
        <UpdateCategoryForm
          category={category}
          categoryName={categoryName}
          isModal
        />
      ) : (
        <div>Category not found</div>
      )}
    </Modal>
  );
}
