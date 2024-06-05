"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import cn from "classnames";
import { type FieldError } from "react-hook-form";

interface TextTextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  className?: string;
  inputClassName?: string;
  error?: FieldError;
}

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextTextAreaProps>(
  (
    { label, name, className, inputClassName = "", error, ...inputProps },
    ref,
  ) => {
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
        <div className="mt-2">
          <textarea
            placeholder={`Type ${label.toLowerCase()} ...`}
            {...inputProps}
            ref={ref}
            id={name}
            name={name}
            className={cn(
              "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
              error ? "ring-red-500" : "focus:ring-indigo-500",
              inputProps.disabled
                ? "cursor-not-allowed bg-gray-100"
                : "bg-white",
              inputClassName,
            )}
          />
        </div>
        {error && (
          <p className="mt-2 text-xs text-red-600" role="alert">
            {error.message}
          </p>
        )}
      </div>
    );
  },
);

TextAreaInput.displayName = "TextAreaInput";
