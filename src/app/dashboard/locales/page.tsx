import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";

import { StatusBadge } from "@/components/statusBadge/StatusBadge";
import { PageLayout } from "@/components/page/PageLayout";
import { Table, type ColumnProps } from "@/components/table/Table";
import { getLocales } from "@/app/apiDomain/locale/queries";
import {
  type LocaleTableData,
  toLocaleTableData,
} from "@/app/apiDomain/locale/utils";

const columns: ColumnProps<LocaleTableData>[] = [
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
          href={`/dashboard/locales/${record.code}/edit`}
          className="align-baseline text-indigo-600 hover:text-indigo-900"
          passHref
        >
          <PencilIcon className="inline-block h-4 w-4" /> Edit
        </Link>
      );
    },
  },
];

async function Locales() {
  const data = await getLocales({ select: toLocaleTableData });

  return (
    <PageLayout
      title="Locales"
      description="A list of all the locales in the app"
      buttonTitle="Create locale"
      buttonHref="/dashboard/locales/create"
    >
      <Table columns={columns} data={data} />
    </PageLayout>
  );
}

export default Locales;
