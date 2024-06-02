import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import { type Locale, type Status } from "@prisma/client";

import { StatusBadge } from "@/components/statusBadge/StatusBadge";
import { PageLayout } from "@/components/page/PageLayout";
import { Table, type ColumnProps } from "@/components/table/Table";
import { getLocales } from "@/app/apiDomain/locale/queries";

type Data = {
  name: string;
  code: string;
  status: Status;
  editLink: string;
};

const columns: ColumnProps<Data>[] = [
  { key: "name", title: "Name" },
  { key: "code", title: "Code", width: 120 },
  {
    key: "status",
    title: "Status",
    width: 120,
    render: (record) => <StatusBadge status={record.status} />,
  },
  {
    key: "editLink",
    title: "Actions",
    align: "right",
    width: 120,
    render: (record) => {
      return (
        <Link
          href={record.editLink}
          className="align-baseline text-indigo-600 hover:text-indigo-900"
          passHref
        >
          <PencilIcon className="inline-block h-4 w-4" /> Edit
        </Link>
      );
    },
  },
];

export function toTableData(locale: Locale): Data {
  return {
    name: locale.name,
    code: locale.code,
    status: locale.status,
    editLink: `/dashboard/locales/${locale.code}`,
  };
}

async function locales() {
  const data = await getLocales({ select: toTableData });

  return (
    <PageLayout
      title="Locales"
      description="A list of all the locales in the app"
      buttonTitle="Add locale"
      buttonHref="/dashboard/locales/create"
    >
      <Table columns={columns} data={data} />
    </PageLayout>
  );
}

export default locales;
