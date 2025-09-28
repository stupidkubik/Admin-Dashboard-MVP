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
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => {
            const active = isSkillSelected(skill);
            return (
              <label
                key={skill}
                className={`cursor-pointer rounded-full px-3 py-1 text-sm transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
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
          <p className="text-sm text-red-600">{errors.skills.message}</p>
        )}
      </div>
    </div>
  );
}
