import cn from "classnames";

import { type LoadingProps, LoadingSpinner } from "./LoadingSpinner";

interface LoadingSpinnerContainerProps extends LoadingProps {
  spinnerClassName?: string;
}
export const LoadingSpinnerContainer = ({
  className,
  spinnerClassName,
  ...props
}: LoadingSpinnerContainerProps) => {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        className,
      )}
    >
      <LoadingSpinner {...props} className={spinnerClassName} />
    </div>
  );
};
