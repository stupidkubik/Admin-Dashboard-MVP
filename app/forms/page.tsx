'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import PageLayout from '@/components/layout/PageLayout'
import { userSchema, UserFormValues } from '@/lib/validators'
import { usePasswordStrength } from '@/lib/hooks/usePasswordStrength'
import { useSkillsFieldArray } from '@/lib/hooks/useSkillsFieldArray'
import { SKILLS_OPTIONS, STATE_OPTIONS } from '@/constants/forms'
import BasicInfoSection from '@/components/forms/BasicInfoSection'
import RoleStatusSection from '@/components/forms/RoleStatusSection'
import SkillsSelector from '@/components/forms/SkillsSelector'
import AddressSection from '@/components/forms/AddressSection'
import NotificationsSection from '@/components/forms/NotificationsSection'
import AgreementSection from '@/components/forms/AgreementSection'
import { useLocale } from '@/contexts/LocaleProvider'

export default function FormsPage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      active: true,
      role: 'viewer',
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
      skills: [],
      address: {
        country: 'United States',
      },
    },
  })

  const { strength: passwordStrength, handlePasswordChange } = usePasswordStrength()
  const { isSkillSelected } = useSkillsFieldArray(control)
  const { t } = useLocale()

  const onSubmit = (data: UserFormValues) => {
    console.log(data)
    toast.success(t('common.messages.formSubmitted', 'Form submitted successfully!'))
  }

  return (
    <PageLayout
      title={t('forms.page.title', 'Advanced User Registration')}
      description={t(
        'forms.page.description',
        'Collect detailed account information and configure preferences at once.'
      )}
      contentClassName="space-y-6"
    >
      <div className="mx-auto max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <BasicInfoSection
            register={register}
            errors={errors}
            passwordStrength={passwordStrength}
            onPasswordChange={handlePasswordChange}
          />

          <RoleStatusSection register={register} errors={errors} />

          <SkillsSelector
            register={register}
            errors={errors}
            skills={SKILLS_OPTIONS}
            isSkillSelected={isSkillSelected}
          />

          <AddressSection
            register={register}
            errors={errors}
            states={STATE_OPTIONS}
          />

          <NotificationsSection register={register} />

          <AgreementSection register={register} errors={errors} />
        </form>
      </div>
    </PageLayout>
  )
}
