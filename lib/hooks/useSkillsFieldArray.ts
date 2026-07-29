import {
  Control,
  FieldArrayPath,
  FieldPath,
  useFieldArray,
  useWatch,
} from "react-hook-form";

type SkillsAwareForm = {
  skills: string[];
};

export function useSkillsFieldArray<TFormValues extends SkillsAwareForm>(
  control: Control<TFormValues>,
) {
  const fieldArray = useFieldArray({
    control,
    name: "skills" as FieldArrayPath<TFormValues>,
  });

  const watchedSkills = useWatch({
    control,
    name: "skills" as FieldPath<TFormValues>,
  });
  const selectedSkills = Array.isArray(watchedSkills)
    ? watchedSkills.filter(
        (skill): skill is string => typeof skill === "string",
      )
    : [];

  const isSkillSelected = (skill: string) => selectedSkills.includes(skill);

  return {
    ...fieldArray,
    selectedSkills,
    isSkillSelected,
  };
}
