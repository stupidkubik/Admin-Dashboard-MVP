"use client"

import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { UserFormValues } from '@/lib/validators'
import { useLocale } from '@/contexts/LocaleProvider'

type RoleStatusSectionProps = {
  register: UseFormRegister<UserFormValues>
  errors: FieldErrors<UserFormValues>
}

export default function RoleStatusSection({ register, errors }: RoleStatusSectionProps) {
  const { t } = useLocale()
  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <h2 className="mb-4 text-lg font-semibold">{t('forms.sections.roleStatus', 'Role and Status')}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">{t('forms.fields.role', 'Role')}</label>
          <Select {...register('role')}>
            <option value="admin">{t('forms.roleOptions.admin', 'Admin')}</option>
            <option value="editor">{t('forms.roleOptions.editor', 'Editor')}</option>
            <option value="viewer">{t('forms.roleOptions.viewer', 'Viewer')}</option>
          </Select>
          {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t('forms.fields.status', 'Status')}</label>
          <div className="flex items-center gap-2">
            <Checkbox {...register('active')} />
            <span>{t('common.status.activeAccount', 'Active Account')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
