"use client";

import { ChangeEvent } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";
import PasswordStrengthMeter from "@/components/forms/PasswordStrengthMeter";
import { UserFormValues } from "@/lib/validators";
import { useLocale } from "@/contexts/LocaleProvider";

type BasicInfoSectionProps = {
  register: UseFormRegister<UserFormValues>;
  errors: FieldErrors<UserFormValues>;
  passwordStrength: number;
  onPasswordChange: (value: string) => void;
};

export default function BasicInfoSection({
  register,
  errors,
  passwordStrength,
  onPasswordChange,
}: BasicInfoSectionProps) {
  const { t } = useLocale();
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    onPasswordChange(event.target.value);
  };

  const passwordField = register("password", {
    onChange: handlePasswordChange,
  });

  return (
    <div className="form-section">
      <h2 className="mb-4 text-lg font-semibold">
        {t("forms.sections.basicInfo", "Basic Information")}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          id="registration-name"
          label={t("forms.fields.fullName", "Full Name")}
          error={errors.name?.message}
        >
          <Input
            autoComplete="name"
            placeholder={t("forms.fields.fullNamePlaceholder", "John Doe")}
            {...register("name")}
          />
        </FormField>

        <FormField
          id="registration-email"
          label={t("forms.fields.email", "Email")}
          error={errors.email?.message}
        >
          <Input
            autoComplete="email"
            type="email"
            placeholder={t("forms.fields.emailPlaceholder", "john@example.com")}
            {...register("email")}
          />
        </FormField>

        <FormField
          id="registration-password"
          label={t("forms.fields.password", "Password")}
          error={errors.password?.message}
          description={<PasswordStrengthMeter strength={passwordStrength} />}
        >
          <Input
            type="password"
            autoComplete="new-password"
            {...passwordField}
          />
        </FormField>

        <FormField
          id="registration-confirm-password"
          label={t("forms.fields.confirmPassword", "Confirm Password")}
          error={errors.confirmPassword?.message}
        >
          <Input
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
        </FormField>

        <FormField
          id="registration-phone"
          label={t("forms.fields.phone", "Phone")}
          error={errors.phone?.message}
        >
          <Input
            autoComplete="tel"
            type="tel"
            placeholder={t("forms.fields.phonePlaceholder", "+1234567890")}
            {...register("phone")}
          />
        </FormField>

        <FormField
          id="registration-date-of-birth"
          label={t("forms.fields.dateOfBirth", "Date of Birth")}
          error={errors.dateOfBirth?.message}
        >
          <Input type="date" autoComplete="bday" {...register("dateOfBirth")} />
        </FormField>
      </div>
    </div>
  );
}
