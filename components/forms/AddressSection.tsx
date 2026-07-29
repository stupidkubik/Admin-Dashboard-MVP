"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FormField } from "@/components/ui/FormField";
import { UserFormValues } from "@/lib/validators";
import { useLocale } from "@/contexts/LocaleProvider";

type AddressSectionProps = {
  register: UseFormRegister<UserFormValues>;
  errors: FieldErrors<UserFormValues>;
  states: readonly string[];
};

export default function AddressSection({
  register,
  errors,
  states,
}: AddressSectionProps) {
  const { t } = useLocale();
  return (
    <div className="form-section">
      <h2 className="mb-4 text-lg font-semibold">
        {t("forms.sections.address", "Address")}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          id="address-street"
          label={t("forms.fields.address.street", "Street Address")}
          error={errors.address?.street?.message}
          className="md:col-span-2"
        >
          <Input {...register("address.street")} />
        </FormField>

        <FormField
          id="address-city"
          label={t("forms.fields.address.city", "City")}
          error={errors.address?.city?.message}
        >
          <Input {...register("address.city")} />
        </FormField>

        <FormField
          id="address-state"
          label={t("forms.fields.address.state", "State")}
          error={errors.address?.state?.message}
        >
          <Select {...register("address.state")}>
            <option value="">
              {t("forms.fields.address.statePlaceholder", "Select State")}
            </option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          id="address-zip-code"
          label={t("forms.fields.address.zipCode", "ZIP Code")}
          error={errors.address?.zipCode?.message}
        >
          <Input
            {...register("address.zipCode")}
            placeholder={t("forms.fields.address.zipCodePlaceholder", "12345")}
          />
        </FormField>

        <FormField
          id="address-country"
          label={t("forms.fields.address.country", "Country")}
          error={errors.address?.country?.message}
        >
          <Input {...register("address.country")} />
        </FormField>
      </div>
    </div>
  );
}
