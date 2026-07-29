"use client";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    "primary" | "secondary" | "outline" | "ghost" | "link" | "destructive";
  size?: "sm" | "base" | "lg";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "base", ...props }, ref) => (
    <button
      ref={ref}
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    />
  ),
);

Button.displayName = "Button";
