"use client";

import { useLocale } from "@/contexts/LocaleProvider";

type Props = {
  strength: number;
};

export default function PasswordStrengthMeter({ strength }: Props) {
  const { t } = useLocale();
  const getColor = (value: number) => {
    if (value <= 2) return "bg-destructive";
    if (value <= 3) return "bg-warning";
    if (value <= 4) return "bg-info";
    return "bg-success";
  };

  const getTextColor = (value: number) => {
    if (value <= 2) return "text-danger";
    if (value <= 3) return "text-warning";
    if (value <= 4) return "text-info";
    return "text-success";
  };

  const getMessage = (value: number) => {
    if (value <= 2) return t("common.password.levels.weak", "Weak");
    if (value <= 3) return t("common.password.levels.fair", "Fair");
    if (value <= 4) return t("common.password.levels.good", "Good");
    return t("common.password.levels.strong", "Strong");
  };

  const message = t(
    "common.password.label",
    "Password strength: {{level}}",
  ).replace("{{level}}", getMessage(strength));

  return (
    <div className="mt-1">
      <div
        className="flex h-1.5 w-full overflow-hidden rounded bg-muted"
        role="progressbar"
        aria-label={message}
        aria-valuenow={strength}
        aria-valuemin={0}
        aria-valuemax={5}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-full w-1/5 ${i < strength ? getColor(strength) : ""}`}
          />
        ))}
      </div>
      <p className={`mt-1 text-xs ${getTextColor(strength)}`}>{message}</p>
    </div>
  );
}
