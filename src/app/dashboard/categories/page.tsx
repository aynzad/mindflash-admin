import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import { type Status } from "@prisma/client";
import { getServerSession } from "next-auth";
import pluralize from "pluralize";

import { StatusBadge } from "@/components/statusBadge/StatusBadge";
import { PageLayout } from "@/components/page/PageLayout";
import { Table, type ColumnProps } from "@/components/table/Table";
import {
  type CategoryWithTranslationAndCreatedBy,
  getCategories,
} from "@/app/apiDomain/category/queries";
import { DEFAULT_LOCALE } from "@/constants";
import { authOptions } from "@/server/auth";

type Data = {
  id: string;
  name: string;
  translations: number;
  status: Status;
  createdBy: string;
  editLink: string;
};

const columns: ColumnProps<Data>[] = [
  {
    key: "name",
    title: `Name (${DEFAULT_LOCALE})`,
    render: (record) => (
      <Link href={`/dashboard/categories/${record.id}`} passHref>
        {record.name}
      </Link>
    ),
  },
  {
    key: "translations",
    title: "Translations",
    width: 100,
    render: (record) => (
      <Link href={`/dashboard/categories/${record.id}`} passHref>
        {record.translations} {pluralize("language", record.translations)}
      </Link>
    ),
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

export function toTableData(
  category: CategoryWithTranslationAndCreatedBy,
): Data {
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

async function Categories() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  const data = await getCategories({ select: toTableData });

  return (
    <PageLayout
      title="Categories"
      description="A list of all the categories in the app"
      buttonTitle="Create category"
      buttonHref="/dashboard/categories/create"
    >
      <Table columns={columns} data={data} />
    </PageLayout>
  );
}

export default Categories;
