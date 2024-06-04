"use client";

import { useState } from "react";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { type Locale } from "@prisma/client";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { TextInput } from "@/components/textInput/TextInput";
import { REQUIRED_RULE } from "./forms.constants";
import {
  upsertBoxTranslation,
  type UpsertBoxTranslationPayload,
} from "@/app/apiDomain/box/actions";
import { StatusBadge } from "../statusBadge/StatusBadge";

export function UpsertBoxTranslationForm({
  boxId,
  locale,
  translation,
}: {
  boxId: string;
  locale: Locale;
  translation?: UpsertBoxTranslationPayload;
}) {
  const isEditing = !!translation;
  const [isPending, setIsPending] = useState(false);
  const [isTranslated, setIsTranslated] = useState(isEditing);

  const { handleSubmit, control } = useForm<UpsertBoxTranslationPayload>({
    defaultValues: translation ?? {
      boxId: boxId,
      localeCode: locale.code,
      name: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<UpsertBoxTranslationPayload> = async (data) => {
    setIsPending(true);
    try {
      await upsertBoxTranslation(data);
      setIsTranslated(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
      <div>
        <h2 className="mb-3 align-baseline text-xl font-semibold leading-7 text-gray-900">
          {locale.code.toUpperCase()}
          {!isTranslated && (
            <ExclamationTriangleIcon className="ml-2 inline-block w-5 text-red-500" />
          )}
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          This translations will be displayed in &quot;{locale.name}&quot;
          locale.
        </p>
        {translation && (
          <p className="my-2 text-sm">Downloads: {translation.downloadCount}</p>
        )}
        <p>
          <StatusBadge status={locale.status} />
        </p>
      </div>

      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
        <div className="sm:col-span-4">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              rules={{ required: REQUIRED_RULE }}
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  label={`Name in ${locale.name} (${locale.code.toUpperCase()})`}
                  {...field}
                  error={error}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({
                field: { value, ...field },
                fieldState: { error },
              }) => (
                <TextInput
                  label={`Description in ${locale.name} (${locale.code.toUpperCase()})`}
                  value={value ?? ""}
                  {...field}
                  error={error}
                />
              )}
            />
            <div className="flex flex-row-reverse">
              <button
                disabled={isPending}
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isTranslated ? "Update" : "Create"} &quot;
                {locale.code.toUpperCase()}&quot; translation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
