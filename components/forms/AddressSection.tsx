"use client"

import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { UserFormValues } from '@/lib/validators'
import { useLocale } from '@/contexts/LocaleProvider'

type AddressSectionProps = {
  register: UseFormRegister<UserFormValues>
  errors: FieldErrors<UserFormValues>
  states: readonly string[]
}

export default function AddressSection({ register, errors, states }: AddressSectionProps) {
  const { t } = useLocale()
  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <h2 className="mb-4 text-lg font-semibold">{t('forms.sections.address', 'Address')}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">{t('forms.fields.address.street', 'Street Address')}</label>
          <Input {...register('address.street')} />
          {errors.address?.street && (
            <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t('forms.fields.address.city', 'City')}</label>
          <Input {...register('address.city')} />
          {errors.address?.city && (
            <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t('forms.fields.address.state', 'State')}</label>
          <Select {...register('address.state')}>
            <option value="">{t('forms.fields.address.statePlaceholder', 'Select State')}</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Select>
          {errors.address?.state && (
            <p className="mt-1 text-sm text-red-600">{errors.address.state.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t('forms.fields.address.zipCode', 'ZIP Code')}</label>
          <Input
            {...register('address.zipCode')}
            placeholder={t('forms.fields.address.zipCodePlaceholder', '12345')}
          />
          {errors.address?.zipCode && (
            <p className="mt-1 text-sm text-red-600">{errors.address.zipCode.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t('forms.fields.address.country', 'Country')}</label>
          <Input {...register('address.country')} />
          {errors.address?.country && (
            <p className="mt-1 text-sm text-red-600">{errors.address.country.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
