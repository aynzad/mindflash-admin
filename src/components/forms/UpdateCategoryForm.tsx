"use client";

import { useState } from "react";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

import { TextInput } from "@/components/textInput/TextInput";
import { SelectStatusInput } from "@/components/selectStatusInput/selectStatusInput";
import {
  type UpdateCategoryPayload,
  updateCategory,
} from "@/app/apiDomain/category/actions";
import { REQUIRED_RULE } from "./forms.constants";
import { DEFAULT_LOCALE } from "@/constants";
import { type CategoryWithConnections } from "@/app/apiDomain/category/queries";

export function UpdateCategoryForm({
  isModal,
  categoryName,
  category,
}: {
  isModal?: boolean;
  categoryName: string;
  category: CategoryWithConnections;
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const { handleSubmit, control } = useForm<UpdateCategoryPayload>({
    defaultValues: {
      id: category.id,
      status: category.status,
    },
  });

  const onSubmit: SubmitHandler<UpdateCategoryPayload> = async (data) => {
    setIsPending(true);
    try {
      await updateCategory(data);
      if (isModal) {
        router.refresh();
        router.back();
      } else {
        router.push("/dashboard/categories");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          name="name"
          label={`Name (${DEFAULT_LOCALE})`}
          defaultValue={categoryName}
          disabled
        />
        <Controller
          name="status"
          control={control}
          rules={{ required: REQUIRED_RULE }}
          render={({ field, fieldState: { error } }) => (
            <SelectStatusInput {...field} error={error} />
          )}
        />

        <div className="flex flex-row-reverse">
          <button
            disabled={isPending}
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update category
          </button>
        </div>
      </form>
    </div>
  );
}
