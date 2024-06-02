import Link from "next/link";

import { PageTitle } from "./PageTitle";

export function PageLayout({
  children,
  title,
  description,
  buttonTitle,
  buttonHref,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  buttonTitle?: string;
  buttonHref?: string;
}) {
  return (
    <div>
      <PageTitle title={title} description={description} />
      {buttonTitle && buttonHref && (
        <div className="mb-4 flex flex-row-reverse">
          <div className="flex">
            <Link
              href={buttonHref}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {buttonTitle}
            </Link>
          </div>
        </div>
      )}
      <div className="mt-2 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
