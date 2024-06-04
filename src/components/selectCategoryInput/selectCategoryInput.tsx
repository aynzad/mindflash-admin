"use client";

import { forwardRef, useMemo } from "react";

import { SelectInput, type SelectInputProps } from "../selectInput/SelectInput";
import { type CategoriesWithConnections } from "@/app/apiDomain/category/queries";

export const SelectCategoryInput = forwardRef<
  HTMLSelectElement,
  Omit<SelectInputProps<string>, "options" | "label" | "name"> & {
    categories: CategoriesWithConnections;
  }
>(({ ...selectInputProps }, ref) => {
  const options = useMemo(() => {
    return selectInputProps.categories.map((category) => ({
      value: category.id,
      key: category.id,
      label: category.CategoryTranslation[0]?.name ?? "-",
    }));
  }, [selectInputProps.categories]);

  return (
    <SelectInput
      name="categoryId"
      options={options}
      label="Category"
      ref={ref}
      {...selectInputProps}
    />
  );
});

SelectCategoryInput.displayName = "SelectCategoryInput";
