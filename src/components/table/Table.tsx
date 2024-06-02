import { type ReactElement } from "react";
import { FolderOpenIcon } from "@heroicons/react/24/outline";

export interface ColumnProps<T> {
  key: string;
  title: string | ReactElement;
  align?: "left" | "right" | "center";
  width?: number;
  render?: (item: T, column: ColumnProps<T>) => ReactElement;
}

type TableProps<T> = {
  columns: Array<ColumnProps<T>>;
  data?: T[];
};

export function Table<T>({ data, columns }: TableProps<T>) {
  return (
    <div className="-mx-4 overflow-hidden ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`text-${column.align ?? "left"} py-3.5 pl-4 pr-3 text-sm font-bold uppercase text-gray-900 sm:pl-6`}
                style={{ width: column.width && `${column.width}px` }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {!data?.length ? (
            <tr>
              <td colSpan={columns.length} className="text-center">
                <div className="my-24 text-center">
                  <FolderOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">
                    No data
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by creating a new data
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`} className="even:bg-gray-50">
                {columns.map((column, columnIndex) => (
                  <td
                    key={`cell-${rowIndex}-${columnIndex}`}
                    className={`text-${column.align ?? "left"} whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6`}
                  >
                    {column.render
                      ? column.render(row, column)
                      : (row[column.key as keyof typeof row] as string)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
