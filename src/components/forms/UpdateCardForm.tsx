"use client";

import { useState } from "react";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

import { SelectStatusInput } from "@/components/selectStatusInput/selectStatusInput";
import {
  type UpdateCardPayload,
  updateCard,
} from "@/app/apiDomain/card/actions";
import { REQUIRED_RULE } from "./forms.constants";
import { DEFAULT_LOCALE } from "@/constants";
import { type CardWithConnections } from "@/app/apiDomain/card/queries";
import { TextAreaInput } from "../TextAreaInput/TextAreaInput";

export function UpdateCardForm({
  isModal,
  cardTextFront,
  cardTextBack,
  card,
  boxId,
}: {
  isModal?: boolean;
  cardTextFront: string;
  cardTextBack: string;
  card: CardWithConnections;
  boxId: string;
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const { handleSubmit, control } = useForm<UpdateCardPayload>({
    defaultValues: {
      id: card.id,
      boxId: card.boxId,
      status: card.status,
    },
  });

  const onSubmit: SubmitHandler<UpdateCardPayload> = async (data) => {
    setIsPending(true);
    try {
      await updateCard(data);
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
        <TextAreaInput
          name="textFront"
          label={`Front (${DEFAULT_LOCALE})`}
          defaultValue={cardTextFront}
          disabled
        />
        <TextAreaInput
          name="textBack"
          label={`Back (${DEFAULT_LOCALE})`}
          defaultValue={cardTextBack}
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
            Update card
          </button>
        </div>
      </form>
    </div>
  );
}
