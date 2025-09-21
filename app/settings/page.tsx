'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { toast } from 'sonner'
import PageLayout from '@/components/layout/PageLayout'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export default function SettingsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; email: string }>({ resolver: zodResolver(schema) })

  const onSubmit = () => {
    toast.success('Settings saved')
  }

  return (
    <PageLayout
      title="Settings"
      description="Update your profile information and notification preferences."
      contentClassName="space-y-6"
    >
      <div className="section-container max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Name" {...register('name')} />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <Input type="email" placeholder="Email" {...register('email')} />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <Button type="submit">Save</Button>
        </form>
      </div>
    </PageLayout>
  )
}
