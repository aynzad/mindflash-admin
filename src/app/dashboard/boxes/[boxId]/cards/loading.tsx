import { LoadingSpinnerPage } from "@/components/loadingSpinner/LoadingSpinnerPage";
import { PageLayout } from "@/components/page/PageLayout";

export default function LoadingPage() {
  return (
    <PageLayout
      title="Cards"
      description="A list of all the cards in the app"
      buttonTitle="Create card"
    >
      <LoadingSpinnerPage />
    </PageLayout>
  );
}
