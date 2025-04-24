import React, { forwardRef } from "react";

import { isNotNullable } from "@/libs/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  variant?: "small" | "medium" | "large";
  fullWidth?: boolean;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  textarea?: boolean;
  rows?: number;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      variant = "medium",
      fullWidth = false,
      className,
      label,
      required = false,
      disabled = false,
      readonly = false,
      textarea = false,
      rows = 3,
      ...props
    },
    ref,
  ) => {
    const baseClasses = "border-input rounded-sm bg-background text-font-neutral-primary text-normal transition-all px-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 placeholder:text-gray-400 read-only:border-transparent disabled:bg-neutral-secondary disabled:border-stroke-neutral-disabled-outline disabled:text-font-neutral-disabled";

    const variantClasses = {
      small: "py-1 text-sm leading-sm",
      medium: "py-2 text-md leading-md",
      large: "py-4 text-lg leading-lg",
    };

    const inputClasses = [
      baseClasses,
      variantClasses[variant],
      fullWidth ? "w-full" : "",
      textarea ? "min-h-[80px] resize-vertical font-sans leading-normal" : "h-8",
      isNotNullable(error) ? "border-red-500" : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`relative flex flex-col gap-1 font-sans ${disabled ? "opacity-60" : ""}`}>
        <label
          htmlFor={props.id}
          className="absolute text-xs text-font-neutral-secondary leading-xs tracking-normal top-[6px] left-[-2px] transform translate-x-[12px] translate-y-[-12px] bg-gradient-to-b from-background to-transparent px-1 font-medium z-[1]"
        >
          {label}
          {required && (
            <span className="text-font-danger-enabled leading-xs text-xs font-medium ml-1">*</span>
          )}
        </label>
        {textarea ? (
          <textarea
            className={inputClasses}
            disabled={disabled}
            readOnly={readonly}
            rows={rows}
            {...(props as any)}
          />
        ) : (
          <input
            ref={ref as any}
            disabled={disabled}
            className={inputClasses}
            readOnly={readonly}
            {...props}
          />
        )}
        {isNotNullable(error) && <p className="text-red-500 mt-1 text-sm">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
