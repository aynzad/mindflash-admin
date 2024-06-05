"use client";

import { useState } from "react";
import { Status } from "@prisma/client";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

import { SelectStatusInput } from "@/components/selectStatusInput/selectStatusInput";
import {
  type CreateCardPayload,
  createCard,
} from "@/app/apiDomain/card/actions";
import { REQUIRED_RULE } from "./forms.constants";
import { DEFAULT_LOCALE } from "@/constants";
import { TextAreaInput } from "../TextAreaInput/TextAreaInput";

export function CreateCardForm({
  isModal,
  boxId,
}: {
  isModal?: boolean;
  boxId: string;
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const { handleSubmit, control } = useForm<CreateCardPayload>({
    defaultValues: {
      textFront: "",
      textBack: "",
      boxId,
      status: Status.ACTIVE,
    },
  });

  const onSubmit: SubmitHandler<CreateCardPayload> = async (data) => {
    setIsPending(true);
    try {
      await createCard(data);
      if (isModal) {
        router.refresh();
        router.back();
      } else {
        router.push(`/dashboard/boxes/${boxId}/cards`);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="textFront"
          control={control}
          rules={{
            required: REQUIRED_RULE,
            maxLength: {
              value: 255,
              message: "Front should not exceed 255 characters",
            },
            minLength: {
              value: 3,
              message: "Front should be at least 3 characters long",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextAreaInput
              label={`Front (${DEFAULT_LOCALE})`}
              {...field}
              error={error}
            />
          )}
        />
        <Controller
          name="textBack"
          control={control}
          rules={{
            required: REQUIRED_RULE,
            maxLength: {
              value: 255,
              message: "Back should not exceed 255 characters",
            },
            minLength: {
              value: 3,
              message: "Back should be at least 3 characters long",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextAreaInput
              label={`Back (${DEFAULT_LOCALE})`}
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
            Create card
          </button>
        </div>
      </form>
    </div>
  );
}
