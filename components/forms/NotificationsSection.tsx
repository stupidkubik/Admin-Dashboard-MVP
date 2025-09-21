import { UseFormRegister } from 'react-hook-form'
import { Switch } from '@/components/ui/Switch'
import { UserFormValues } from '@/lib/validators'

type NotificationsSectionProps = {
  register: UseFormRegister<UserFormValues>
}

export default function NotificationsSection({ register }: NotificationsSectionProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <h2 className="mb-4 text-lg font-semibold">Notification Preferences</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Email Notifications</label>
          <Switch {...register('notifications.email')} />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">SMS Notifications</label>
          <Switch {...register('notifications.sms')} />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Push Notifications</label>
          <Switch {...register('notifications.push')} />
        </div>
      </div>
    </div>
  )
}
