import { getCategories } from "@/app/apiDomain/category/queries";
import { CreateBoxForm } from "@/components/forms/CreateBoxForm";
import { PageLayout } from "@/components/page/PageLayout";

export default async function CreateBox() {
  const categories = await getCategories({});

  return (
    <PageLayout title="Create box" description="Create new box">
      <CreateBoxForm categories={categories} />
    </PageLayout>
  );
}
