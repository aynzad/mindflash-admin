import { getLocale } from "@/app/apiDomain/locale/queries";
import { UpsertLocaleForm } from "@/components/forms/UpsertLocaleForm";
import { Modal } from "@/components/modal/Modal";

export default async function EditLocaleModal({
  params: { code },
}: {
  params: { code: string };
}) {
  const locale = await getLocale(code);

  return (
    <Modal title={`Edit "${code.toUpperCase()}" locale`}>
      {locale ? (
        <UpsertLocaleForm locale={locale} isModal />
      ) : (
        <div>Locale not found</div>
      )}
    </Modal>
  );
}
