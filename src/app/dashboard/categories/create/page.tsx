import { CreateCategoryForm } from "@/components/forms/CreateCategoryForm";
import { PageLayout } from "@/components/page/PageLayout";

export default async function CreateLocale() {
  return (
    <PageLayout title="Create category" description="Create new category">
      <CreateCategoryForm />
    </PageLayout>
  );
}
