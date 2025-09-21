import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { UserFormValues } from '@/lib/validators'

type RoleStatusSectionProps = {
  register: UseFormRegister<UserFormValues>
  errors: FieldErrors<UserFormValues>
}

export default function RoleStatusSection({ register, errors }: RoleStatusSectionProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <h2 className="mb-4 text-lg font-semibold">Role and Status</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Role</label>
          <Select {...register('role')}>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </Select>
          {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Status</label>
          <div className="flex items-center gap-2">
            <Checkbox {...register('active')} />
            <span>Active Account</span>
          </div>
        </div>
      </div>
    </div>
  )
}
