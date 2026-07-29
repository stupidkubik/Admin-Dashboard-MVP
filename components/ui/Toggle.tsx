"use client";
import { useState, ButtonHTMLAttributes } from "react";

type ToggleProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Toggle({ className = "", ...props }: ToggleProps) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      aria-pressed={pressed}
      onClick={(e) => {
        setPressed((p) => !p);
        props.onClick?.(e);
      }}
      className={`rounded border px-3 py-2 text-sm ${
        pressed
          ? "bg-primary text-primary-foreground"
          : "bg-background text-foreground"
      } ${className}`}
    />
  );
}
