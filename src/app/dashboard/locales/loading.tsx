import { LoadingSpinnerPage } from "@/components/loadingSpinner/LoadingSpinnerPage";
import { PageLayout } from "@/components/page/PageLayout";

export default function LoadingPage() {
  return (
    <PageLayout
      title="Locales"
      description="A list of all the locales in the app"
      buttonTitle="Create locale"
      buttonHref="/dashboard/locales/create"
    >
      <LoadingSpinnerPage />
    </PageLayout>
  );
}
