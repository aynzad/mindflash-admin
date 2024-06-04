import cn from "classnames";

import { Modal } from "../modal/Modal";
import { LoadingSpinnerContainer } from "./LoadingSpinnerContainer";

interface LoadingSpinnerModalProps {
  className?: string;
}
export const LoadingSpinnerModal = ({
  className,
}: LoadingSpinnerModalProps) => {
  return (
    <Modal title="">
      <div className={cn("my-16 text-center", className)}>
        <LoadingSpinnerContainer className="min-h-64" size="xl" />
      </div>
    </Modal>
  );
};
