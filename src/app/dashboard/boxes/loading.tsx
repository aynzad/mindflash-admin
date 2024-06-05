import { LoadingSpinnerPage } from "@/components/loadingSpinner/LoadingSpinnerPage";
import { PageLayout } from "@/components/page/PageLayout";

export default function LoadingPage() {
  return (
    <PageLayout
      title="Boxes"
      description="A list of all the boxes in the app"
      buttonTitle="Create box"
      buttonHref="/dashboard/boxes/create"
    >
      <LoadingSpinnerPage />
    </PageLayout>
  );
}
