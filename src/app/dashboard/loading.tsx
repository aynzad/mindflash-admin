import { LoadingSpinnerPage } from "@/components/loadingSpinner/LoadingSpinnerPage";
import { PageLayout } from "@/components/page/PageLayout";

export default function LoadingPage() {
  return (
    <PageLayout
      title="Dashboard"
      description="manage the app"
      buttonTitle="Create Box"
      buttonHref="/dashboard/boxes/create"
    >
      <LoadingSpinnerPage />
    </PageLayout>
  );
}
