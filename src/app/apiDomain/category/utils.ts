import { type Status } from "@prisma/client";

import { type CategoryWithConnections } from "./queries";
import { DEFAULT_LOCALE } from "@/constants";

export type CategoryTableData = {
  id: string;
  name: string;
  translations: number;
  status: Status;
  createdBy: string;
  editLink: string;
};

export function toCategoryTableData(
  category: CategoryWithConnections,
): CategoryTableData {
  return {
    id: category.id,
    name:
      category.CategoryTranslation.find(
        (item) => item.localeCode === DEFAULT_LOCALE,
      )?.name ?? "-",
    translations: category.CategoryTranslation.length,
    status: category.status,
    createdBy: category.createdBy.name ?? "-",
    editLink: `/dashboard/categories/${category.id}/edit`,
  };
}
