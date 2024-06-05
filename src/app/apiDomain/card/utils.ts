import { type Status } from "@prisma/client";

import { type CardWithConnections } from "./queries";
import { DEFAULT_LOCALE } from "@/constants";

export type CardTableData = {
  id: string;
  textFront: string;
  textBack: string;
  translations: number;
  status: Status;
  box: CardWithConnections["box"];
  createdBy: string;
};

export function toCardTableData(card: CardWithConnections): CardTableData {
  return {
    id: card.id,
    textFront:
      card.CardTranslation.find((item) => item.localeCode === DEFAULT_LOCALE)
        ?.textFront ?? "-",
    textBack:
      card.CardTranslation.find((item) => item.localeCode === DEFAULT_LOCALE)
        ?.textBack ?? "-",
    translations: card.CardTranslation.length,
    status: card.status,
    box: card.box,
    createdBy: card.createdBy.name ?? "-",
  };
}
