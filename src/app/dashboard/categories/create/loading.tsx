import { LoadingSpinnerPage } from "@/components/loadingSpinner/LoadingSpinnerPage";
import { PageLayout } from "@/components/page/PageLayout";

export default function LoadingPage() {
  return (
    <PageLayout title="Create category" description="Create new category">
      <LoadingSpinnerPage />
    </PageLayout>
  );
}
