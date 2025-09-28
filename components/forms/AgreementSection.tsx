"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { UserFormValues } from "@/lib/validators";
import { useLocale } from "@/contexts/LocaleProvider";

type AgreementSectionProps = {
  register: UseFormRegister<UserFormValues>;
  errors: FieldErrors<UserFormValues>;
};

export default function AgreementSection({
  register,
  errors,
}: AgreementSectionProps) {
  const { t } = useLocale();
  return (
    <div className="form-section space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Checkbox {...register("agreement")} />
        <label className="text-sm">
          {t(
            "forms.fields.agreement",
            "I agree to the Terms of Service and Privacy Policy",
          )}
        </label>
      </div>
      {errors.agreement && (
        <p className="text-sm text-red-600">{errors.agreement.message}</p>
      )}

      <Button type="submit" className="w-full">
        {t("forms.actions.submit", "Create Account")}
      </Button>
    </div>
  );
}
