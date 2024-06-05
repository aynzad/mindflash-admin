import { type Status } from "@prisma/client";

import { type BoxWithConnections } from "./queries";
import { DEFAULT_LOCALE } from "@/constants";

export type BoxTableData = {
  id: string;
  name: string;
  translations: number;
  status: Status;
  category: BoxWithConnections["category"];
  downloads: number;
  createdBy: string;
};

export function toBoxTableData(box: BoxWithConnections): BoxTableData {
  return {
    id: box.id,
    name:
      box.BoxTranslation.find((item) => item.localeCode === DEFAULT_LOCALE)
        ?.name ?? "-",
    translations: box.BoxTranslation.length,
    status: box.status,
    category: box.category,
    downloads: box.downloadCount,
    createdBy: box.createdBy.name ?? "-",
  };
}
