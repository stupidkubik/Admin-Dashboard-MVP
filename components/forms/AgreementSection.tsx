import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { UserFormValues } from '@/lib/validators'

type AgreementSectionProps = {
  register: UseFormRegister<UserFormValues>
  errors: FieldErrors<UserFormValues>
}

export default function AgreementSection({ register, errors }: AgreementSectionProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <div className="mb-4 flex items-center gap-2">
        <Checkbox {...register('agreement')} />
        <label className="text-sm">
          I agree to the Terms of Service and Privacy Policy
        </label>
      </div>
      {errors.agreement && (
        <p className="mb-4 text-sm text-red-600">{errors.agreement.message}</p>
      )}

      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </div>
  )
}
