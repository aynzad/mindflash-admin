"use client";

import {
  useCallback,
  type InputHTMLAttributes,
  type ChangeEvent,
  type ForwardedRef,
  forwardRef,
} from "react";
import { type FieldError } from "react-hook-form";
import cn from "classnames";

interface SelectInputOptions<TValue extends string> {
  value: TValue;
  key: string;
  label: string;
}

export interface SelectInputProps<TValue extends string>
  extends Omit<
    InputHTMLAttributes<HTMLSelectElement>,
    "value" | "onChange" | "name"
  > {
  label: string;
  name: string;
  className?: string;
  inputClassName?: string;
  value: TValue;
  options: SelectInputOptions<TValue>[];
  onChange?: (newValue: TValue) => void;
  error?: FieldError;
}

export function SelectInputComponent<TValue extends string>(
  {
    label,
    name,
    className,
    inputClassName,
    options,
    onChange,
    error,
    ...inputProps
  }: SelectInputProps<TValue>,
  ref: React.Ref<HTMLSelectElement>,
) {
  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      if (!onChange) return;
      const value = event.target.value as TValue;
      onChange(value);
    },
    [onChange],
  );

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className={cn(
          "block text-sm font-medium leading-6",
          error ? "text-red-600" : "text-gray-900",
        )}
      >
        {label}
      </label>
      <select
        placeholder={`Select ${label.toLowerCase()} ...`}
        {...inputProps}
        ref={ref}
        onChange={handleOnChange}
        id={name}
        name={name}
        className={cn(
          "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6",
          inputProps.disabled ? "cursor-not-allowed bg-gray-100" : "bg-white",
          error ? "ring-red-500" : "focus:ring-indigo-500",
          inputClassName,
        )}
      >
        {options.map((option) => (
          <option key={option.key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-xs text-red-600" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}

export const SelectInput = forwardRef(SelectInputComponent) as <
  TValue extends string,
>(
  props: SelectInputProps<TValue> & { ref?: ForwardedRef<HTMLSelectElement> },
) => ReturnType<typeof SelectInputComponent>;
