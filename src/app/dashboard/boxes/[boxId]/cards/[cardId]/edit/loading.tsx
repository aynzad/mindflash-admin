import { LoadingSpinnerPage } from "@/components/loadingSpinner/LoadingSpinnerPage";
import { PageLayout } from "@/components/page/PageLayout";

export default function LoadingPage() {
  return (
    <PageLayout title="Edit card" description="Edit card information">
      <LoadingSpinnerPage />
    </PageLayout>
  );
}
