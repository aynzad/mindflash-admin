"use client";

import { useState } from "react";
import { Status } from "@prisma/client";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

import { TextInput } from "@/components/textInput/TextInput";
import { SelectStatusInput } from "@/components/selectStatusInput/selectStatusInput";
import {
  type CreateCategoryPayload,
  createCategory,
} from "@/app/apiDomain/category/actions";
import { REQUIRED_RULE } from "./forms.constants";
import { DEFAULT_LOCALE } from "@/constants";

export function CreateCategoryForm({ isModal }: { isModal?: boolean }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const { handleSubmit, control } = useForm<CreateCategoryPayload>({
    defaultValues: {
      name: "",
      status: Status.ACTIVE,
    },
  });

  const onSubmit: SubmitHandler<CreateCategoryPayload> = async (data) => {
    setIsPending(true);
    try {
      await createCategory(data);
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
        <Controller
          name="name"
          control={control}
          rules={{
            required: REQUIRED_RULE,
            maxLength: {
              value: 20,
              message: "Code should not exceed 20 characters",
            },
            minLength: {
              value: 3,
              message: "name should be at least 3 characters long",
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
            Create category
          </button>
        </div>
      </form>
    </div>
  );
}
