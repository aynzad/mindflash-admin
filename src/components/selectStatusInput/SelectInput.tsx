"use client";

import { forwardRef } from "react";
import { Status } from "@prisma/client";
import { type Status as StatusType } from "@prisma/client";

import { SelectInput, type SelectInputProps } from "../selectInput/SelectInput";

const OPTIONS = Object.values(Status).map((status) => ({
  value: status,
  key: status,
  label: status,
}));

export const SelectStatus = forwardRef<
  HTMLSelectElement,
  Omit<SelectInputProps<StatusType>, "options" | "label" | "name">
>(({ ...selectInputProps }, ref) => {
  return (
    <SelectInput
      name="status"
      options={OPTIONS}
      label="Status"
      ref={ref}
      {...selectInputProps}
    />
  );
});

SelectStatus.displayName = "SelectStatus";
