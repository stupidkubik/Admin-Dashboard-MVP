"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/ui/FormField";
import { UserFormValues } from "@/lib/validators";
import { useLocale } from "@/contexts/LocaleProvider";

type RoleStatusSectionProps = {
  register: UseFormRegister<UserFormValues>;
  errors: FieldErrors<UserFormValues>;
};

export default function RoleStatusSection({
  register,
  errors,
}: RoleStatusSectionProps) {
  const { t } = useLocale();
  return (
    <div className="form-section">
      <h2 className="mb-4 text-lg font-semibold">
        {t("forms.sections.roleStatus", "Role and Status")}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          id="registration-role"
          label={t("forms.fields.role", "Role")}
          error={errors.role?.message}
        >
          <Select {...register("role")}>
            <option value="admin">
              {t("forms.roleOptions.admin", "Admin")}
            </option>
            <option value="editor">
              {t("forms.roleOptions.editor", "Editor")}
            </option>
            <option value="viewer">
              {t("forms.roleOptions.viewer", "Viewer")}
            </option>
          </Select>
        </FormField>

        <div>
          <span className="mb-1 block text-sm font-medium">
            {t("forms.fields.status", "Status")}
          </span>
          <label
            className="flex items-center gap-2"
            htmlFor="registration-active"
          >
            <Checkbox id="registration-active" {...register("active")} />
            <span>{t("common.status.activeAccount", "Active Account")}</span>
          </label>
        </div>
      </div>
    </div>
  );
}
