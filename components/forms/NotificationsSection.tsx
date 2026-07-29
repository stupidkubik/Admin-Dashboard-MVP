"use client";

import { UseFormRegister } from "react-hook-form";
import { Switch } from "@/components/ui/Switch";
import { UserFormValues } from "@/lib/validators";
import { useLocale } from "@/contexts/LocaleProvider";

type NotificationsSectionProps = {
  register: UseFormRegister<UserFormValues>;
};

export default function NotificationsSection({
  register,
}: NotificationsSectionProps) {
  const { t } = useLocale();
  return (
    <div className="form-section">
      <h2 className="mb-4 text-lg font-semibold">
        {t("forms.sections.notifications", "Notification Preferences")}
      </h2>
      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-sm font-medium" htmlFor="notifications-email">
            {t("forms.fields.notifications.email", "Email Notifications")}
          </label>
          <Switch
            id="notifications-email"
            {...register("notifications.email")}
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-sm font-medium" htmlFor="notifications-sms">
            {t("forms.fields.notifications.sms", "SMS Notifications")}
          </label>
          <Switch id="notifications-sms" {...register("notifications.sms")} />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-sm font-medium" htmlFor="notifications-push">
            {t("forms.fields.notifications.push", "Push Notifications")}
          </label>
          <Switch id="notifications-push" {...register("notifications.push")} />
        </div>
      </div>
    </div>
  );
}
