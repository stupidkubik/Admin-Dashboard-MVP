"use client";

import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useId,
} from "react";

type FormControlProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};

type FormFieldProps = {
  label: ReactNode;
  children: ReactElement<FormControlProps>;
  error?: ReactNode;
  description?: ReactNode;
  id?: string;
  className?: string;
};

export function FormField({
  label,
  children,
  error,
  description,
  id,
  className = "",
}: FormFieldProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ");

  if (!isValidElement(children)) {
    return null;
  }

  const control = cloneElement(children, {
    id: controlId,
    "aria-describedby": describedBy || undefined,
    "aria-invalid": error ? true : undefined,
  });

  return (
    <div className={`form-group ${className}`}>
      <label className="form-label" htmlFor={controlId}>
        {label}
      </label>
      {control}
      {description && (
        <div id={descriptionId} className="form-description">
          {description}
        </div>
      )}
      {error && (
        <p id={errorId} className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
