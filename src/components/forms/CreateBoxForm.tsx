"use client";

import { useState } from "react";
import { Status } from "@prisma/client";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

import { TextInput } from "@/components/textInput/TextInput";
import { SelectStatusInput } from "@/components/selectStatusInput/selectStatusInput";
import { type CreateBoxPayload, createBox } from "@/app/apiDomain/box/actions";
import { REQUIRED_RULE } from "./forms.constants";
import { DEFAULT_LOCALE } from "@/constants";
import { type CategoriesWithConnections } from "@/app/apiDomain/category/queries";
import { SelectCategoryInput } from "../selectCategoryInput/selectCategoryInput";

export function CreateBoxForm({
  isModal,
  categories,
}: {
  isModal?: boolean;
  categories: CategoriesWithConnections;
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const { handleSubmit, control } = useForm<CreateBoxPayload>({
    defaultValues: {
      name: "",
      description: "",
      categoryId: categories[0]?.id ?? "",
      status: Status.ACTIVE,
    },
  });

  const onSubmit: SubmitHandler<CreateBoxPayload> = async (data) => {
    setIsPending(true);
    try {
      await createBox(data);
      if (isModal) {
        router.refresh();
        router.back();
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
        <Controller
          name="name"
          control={control}
          rules={{
            required: REQUIRED_RULE,
            maxLength: {
              value: 30,
              message: "Code should not exceed 30 characters",
            },
            minLength: {
              value: 5,
              message: "name should be at least 5 characters long",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              label={`Name (${DEFAULT_LOCALE})`}
              {...field}
              error={error}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              label={`Description (${DEFAULT_LOCALE})`}
              {...field}
              error={error}
            />
          )}
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
            Create box
          </button>
        </div>
      </form>
    </div>
  );
}
