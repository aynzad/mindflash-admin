"use client";

import { useState } from "react";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

import { TextInput } from "@/components/textInput/TextInput";
import { SelectStatusInput } from "@/components/selectStatusInput/selectStatusInput";
import { type UpdateBoxPayload, updateBox } from "@/app/apiDomain/box/actions";
import { REQUIRED_RULE } from "./forms.constants";
import { DEFAULT_LOCALE } from "@/constants";
import { type BoxWithConnections } from "@/app/apiDomain/box/queries";
import { SelectCategoryInput } from "../selectCategoryInput/selectCategoryInput";
import { type CategoriesWithConnections } from "@/app/apiDomain/category/queries";

export function UpdateBoxForm({
  isModal,
  boxName,
  box,
  categories,
}: {
  isModal?: boolean;
  boxName: string;
  box: BoxWithConnections;
  categories: CategoriesWithConnections;
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const { handleSubmit, control } = useForm<UpdateBoxPayload>({
    defaultValues: {
      id: box.id,
      categoryId: box.categoryId,
      status: box.status,
    },
  });

  const onSubmit: SubmitHandler<UpdateBoxPayload> = async (data) => {
    setIsPending(true);
    try {
      await updateBox(data);
      if (isModal) {
        router.refresh();
        // to fix refresh data after closing modal issue
        setTimeout(() => router.back(), 100);
      } else {
        router.push("/dashboard/boxes");
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
          defaultValue={boxName}
          disabled
        />
        <Controller
          name="categoryId"
          control={control}
          rules={{ required: REQUIRED_RULE }}
          render={({ field, fieldState: { error } }) => (
            <SelectCategoryInput
              {...field}
              categories={categories}
              error={error}
            />
          )}
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
            Update box
          </button>
        </div>
      </form>
    </div>
  );
}
