import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import { getServerSession } from "next-auth";
import pluralize from "pluralize";

import { StatusBadge } from "@/components/statusBadge/StatusBadge";
import { PageLayout } from "@/components/page/PageLayout";
import { Table, type ColumnProps } from "@/components/table/Table";
import { getCards } from "@/app/apiDomain/card/queries";
import { DEFAULT_LOCALE } from "@/constants";
import { authOptions } from "@/server/auth";
import {
  type CardTableData,
  toCardTableData,
} from "@/app/apiDomain/card/utils";

const columns: ColumnProps<CardTableData>[] = [
  {
    key: "textFront",
    title: `Front (${DEFAULT_LOCALE})`,
    render: (record) => (
      <Link
        href={`/dashboard/boxes/${record.box.id}/cards/${record.id}`}
        passHref
      >
        {record.textFront}
      </Link>
    ),
  },
  {
    key: "textBack",
    title: `Back (${DEFAULT_LOCALE})`,
    render: (record) => (
      <Link
        href={`/dashboard/boxes/${record.box.id}/cards/${record.id}`}
        passHref
      >
        {record.textBack}
      </Link>
    ),
  },
  {
    key: "translations",
    title: "Translations",
    width: 100,
    render: (record) => (
      <Link
        href={`/dashboard/boxes/${record.box.id}/cards/${record.id}`}
        passHref
      >
        {record.translations} {pluralize("language", record.translations)}
      </Link>
    ),
  },
  {
    key: "box",
    title: "Box",
    render: (record) => (
      <Link href={`/dashboard/boxes/${record.box.id}`} passHref>
        {record.box.BoxTranslation[0]?.name ?? "-"}
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
    width: 220,
    render: (record) => {
      return (
        <Link
          href={`/dashboard/boxes/${record.box.id}/cards/${record.id}/edit`}
          className="align-baseline text-indigo-600 hover:text-indigo-900"
          passHref
        >
          <PencilIcon className="inline-block h-4 w-4" /> Edit
        </Link>
      );
    },
  },
];

async function Cards({ params: { boxId } }: { params: { boxId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  const data = await getCards({ select: toCardTableData, boxId });

  return (
    <PageLayout
      title="Cards"
      description="A list of all the cards in this box"
      buttonTitle="Create card"
      buttonHref={`/dashboard/boxes/${boxId}/cards/create`}
    >
      <Table columns={columns} data={data} />
    </PageLayout>
  );
}

export default Cards;
