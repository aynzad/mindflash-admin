import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import { getServerSession } from "next-auth";
import pluralize from "pluralize";

import { StatusBadge } from "@/components/statusBadge/StatusBadge";
import { PageLayout } from "@/components/page/PageLayout";
import { Table, type ColumnProps } from "@/components/table/Table";
import { getBoxes } from "@/app/apiDomain/box/queries";
import { DEFAULT_LOCALE } from "@/constants";
import { authOptions } from "@/server/auth";
import { type BoxTableData, toBoxTableData } from "@/app/apiDomain/box/utils";

const columns: ColumnProps<BoxTableData>[] = [
  {
    key: "name",
    title: `Name (${DEFAULT_LOCALE})`,
    render: (record) => (
      <Link href={`/dashboard/boxes/${record.id}`} passHref>
        {record.name}
      </Link>
    ),
  },
  {
    key: "translations",
    title: "Translations",
    width: 100,
    render: (record) => (
      <Link href={`/dashboard/boxes/${record.id}`} passHref>
        {record.translations} {pluralize("language", record.translations)}
      </Link>
    ),
  },
  {
    key: "category",
    title: "Category",
    render: (record) => (
      <Link href={`/dashboard/categories/${record.category.id}`} passHref>
        {record.category.CategoryTranslation[0]?.name ?? "-"}
      </Link>
    ),
  },
  {
    key: "downloads",
    title: "Downloads",
    width: 60,
  },
  {
    key: "createdBy",
    title: "By",
  },
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

async function Boxes() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  const data = await getBoxes({ select: toBoxTableData });

  return (
    <PageLayout
      title="Boxes"
      description="A list of all the boxes in the app"
      buttonTitle="Create box"
      buttonHref="/dashboard/boxes/create"
    >
      <Table columns={columns} data={data} />
    </PageLayout>
  );
}

export default Boxes;
