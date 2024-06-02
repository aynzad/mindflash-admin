"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function PageTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setEl(document.getElementById("page-title-root"));
  }, []);

  if (el) {
    return createPortal(
      <div className="flex flex-row content-center items-center gap-2 py-4">
        <h1 className="text-xl font-semibold leading-6 text-gray-900">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>,
      el,
    );
  }

  return null;
}
