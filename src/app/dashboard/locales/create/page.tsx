import { UpsertLocaleForm } from "@/components/forms/UpsertLocaleForm";
import { PageLayout } from "@/components/page/PageLayout";

export default function CreateLocale() {
  return (
    <PageLayout title="Create locale" description="Create new locale">
      <UpsertLocaleForm />
    </PageLayout>
  );
}
