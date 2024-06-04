"use client";

import { useState } from "react";
import { Status, type Locale } from "@prisma/client";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

import { TextInput } from "@/components/textInput/TextInput";
import { SelectStatusInput } from "@/components/selectStatusInput/selectStatusInput";
import { upsertLocale } from "@/app/apiDomain/locale/actions";
import { REQUIRED_RULE } from "./forms.constants";

export function UpsertLocaleForm({
  isModal,
  locale,
}: {
  isModal?: boolean;
  locale?: Locale;
}) {
  const isEditing = !!locale;
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const { handleSubmit, control } = useForm<Locale>({
    defaultValues: locale ?? {
      code: "",
      name: "",
      status: Status.ACTIVE,
    },
  });

  const onSubmit: SubmitHandler<Locale> = async (data) => {
    setIsPending(true);
    try {
      await upsertLocale(data);
      if (isModal) {
        router.refresh();
        // to fix refresh data after closing modal issue
        setTimeout(() => router.back(), 100);
      } else {
        router.push("/dashboard/locales");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="code"
          control={control}
          rules={{
            required: REQUIRED_RULE,
            maxLength: {
              value: 2,
              message: "Code should be exactly 2 characters long",
            },
            minLength: {
              value: 2,
              message: "Code should be exactly 2 characters long",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextInput label="Code" {...field} error={error} />
          )}
        />
        <Controller
          name="name"
          control={control}
          rules={{ required: REQUIRED_RULE }}
          render={({ field, fieldState: { error } }) => (
            <TextInput label="Name" {...field} error={error} />
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
            {isEditing ? "Update" : "Create"} locale
          </button>
        </div>
      </form>
    </div>
  );
}
