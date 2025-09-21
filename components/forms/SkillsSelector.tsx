import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Checkbox } from '@/components/ui/Checkbox'
import { UserFormValues } from '@/lib/validators'

type SkillsSelectorProps = {
  skills: readonly string[]
  register: UseFormRegister<UserFormValues>
  errors: FieldErrors<UserFormValues>
  isSkillSelected: (skill: string) => boolean
}

export default function SkillsSelector({
  skills,
  register,
  errors,
  isSkillSelected,
}: SkillsSelectorProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <h2 className="mb-4 text-lg font-semibold">Skills</h2>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => {
            const active = isSkillSelected(skill)
            return (
              <label
                key={skill}
                className={`cursor-pointer rounded-full px-3 py-1 text-sm ${
                  active
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  value={skill}
                  {...register('skills')}
                />
                {skill}
              </label>
            )
          })}
        </div>
        {errors.skills && (
          <p className="text-sm text-red-600">{errors.skills.message}</p>
        )}
      </div>
    </div>
  )
}
