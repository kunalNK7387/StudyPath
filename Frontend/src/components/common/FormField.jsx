import React from "react";
import { AlertCircle, HelpCircle } from "lucide-react";

export const FormField = ({
  label,
  id,
  description,
  required,
  error,
  children,
}) => {
  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-sm font-semibold text-[#252A27] dark:text-[#F1F3F1] flex items-center gap-1.5"
        >
          <span>{label}</span>
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>
        {description && (
          <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            <span className="hidden sm:inline">{description}</span>
          </span>
        )}
      </div>

      {children}

      {error ? (
        <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      ) : description ? (
        <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] sm:hidden mt-0.5">
          {description}
        </p>
      ) : null}
    </div>
  );
};
