"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Checkbox } from "@/components/ui/Checkbox";
import { UserFormValues } from "@/lib/validators";
import { useLocale } from "@/contexts/LocaleProvider";

type SkillsSelectorProps = {
  skills: readonly string[];
  register: UseFormRegister<UserFormValues>;
  errors: FieldErrors<UserFormValues>;
  isSkillSelected: (skill: string) => boolean;
};

export default function SkillsSelector({
  skills,
  register,
  errors,
  isSkillSelected,
}: SkillsSelectorProps) {
  const { t } = useLocale();
  return (
    <div className="form-section">
      <h2 className="mb-4 text-lg font-semibold">
        {t("forms.sections.skills", "Skills")}
      </h2>
      <fieldset
        className="space-y-4"
        aria-describedby={
          errors.skills ? "registration-skills-error" : undefined
        }
      >
        <legend className="sr-only">
          {t("forms.sections.skills", "Skills")}
        </legend>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => {
            const active = isSkillSelected(skill);
            return (
              <label
                key={skill}
                className={`cursor-pointer rounded-full px-3 py-1 text-sm transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  value={skill}
                  {...register("skills")}
                />
                {skill}
              </label>
            );
          })}
        </div>
        {errors.skills && (
          <p id="registration-skills-error" className="form-error" role="alert">
            {errors.skills.message}
          </p>
        )}
      </fieldset>
    </div>
  );
}
