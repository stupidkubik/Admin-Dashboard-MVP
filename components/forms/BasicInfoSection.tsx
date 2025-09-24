"use client";

import { ChangeEvent } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/Input";
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
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <h2 className="mb-4 text-lg font-semibold">
        {t("forms.sections.basicInfo", "Basic Information")}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            {t("forms.fields.fullName", "Full Name")}
          </label>
          <Input
            placeholder={t("forms.fields.fullNamePlaceholder", "John Doe")}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            {t("forms.fields.email", "Email")}
          </label>
          <Input
            type="email"
            placeholder={t("forms.fields.emailPlaceholder", "john@example.com")}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            {t("forms.fields.password", "Password")}
          </label>
          <Input type="password" {...passwordField} />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
          <PasswordStrengthMeter strength={passwordStrength} />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            {t("forms.fields.confirmPassword", "Confirm Password")}
          </label>
          <Input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            {t("forms.fields.phone", "Phone")}
          </label>
          <Input
            type="tel"
            placeholder={t("forms.fields.phonePlaceholder", "+1234567890")}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            {t("forms.fields.dateOfBirth", "Date of Birth")}
          </label>
          <Input type="date" {...register("dateOfBirth")} />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
