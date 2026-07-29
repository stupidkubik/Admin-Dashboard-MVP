"use client";
import { InputHTMLAttributes, forwardRef } from "react";

export const Checkbox = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    className={`h-4 w-4 rounded border-input bg-background text-primary focus:ring-ring ${className}`}
    {...props}
  />
));

Checkbox.displayName = "Checkbox";
