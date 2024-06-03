import { type Locale, type Status } from "@prisma/client";

export type LocaleTableData = {
  name: string;
  code: string;
  status: Status;
  editLink: string;
};

export function toLocaleTableData(locale: Locale): LocaleTableData {
  return {
    name: locale.name,
    code: locale.code,
    status: locale.status,
    editLink: `/dashboard/locales/${locale.code}/edit`,
  };
}
