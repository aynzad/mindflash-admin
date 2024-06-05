import { LoadingSpinnerPage } from "@/components/loadingSpinner/LoadingSpinnerPage";
import { PageLayout } from "@/components/page/PageLayout";

export default function LoadingPage() {
  return (
    <PageLayout
      title="Categories"
      description="A list of all the categories in the app"
      buttonTitle="Create category"
      buttonHref="/dashboard/categories/create"
    >
      <LoadingSpinnerPage />
    </PageLayout>
  );
}
