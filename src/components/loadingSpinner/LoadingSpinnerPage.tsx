import cn from "classnames";

import { LoadingSpinnerContainer } from "./LoadingSpinnerContainer";

interface LoadingSpinnerModalPage {
  className?: string;
}
export const LoadingSpinnerPage = ({ className }: LoadingSpinnerModalPage) => {
  return (
    <div className={cn("text-center", className)}>
      <LoadingSpinnerContainer className="min-h-96" size="xl" />
    </div>
  );
};
