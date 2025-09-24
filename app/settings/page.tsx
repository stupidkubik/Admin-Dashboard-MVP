"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import PageLayout from "@/components/layout/PageLayout";
import { useLocale } from "@/contexts/LocaleProvider";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export default function SettingsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; email: string }>({
    resolver: zodResolver(schema),
  });
  const { t } = useLocale();

  const onSubmit = () => {
    toast.success(t("common.messages.settingsSaved", "Settings saved"));
  };

  return (
    <PageLayout
      title={t("settings.page.title", "Settings")}
      description={t(
        "settings.page.description",
        "Update your profile information and notification preferences.",
      )}
      contentClassName="space-y-6"
    >
      <div className="section-container max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder={t("settings.fields.namePlaceholder", "Name")}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input
              type="email"
              placeholder={t("settings.fields.emailPlaceholder", "Email")}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <Button type="submit">{t("common.buttons.save", "Save")}</Button>
        </form>
      </div>
    </PageLayout>
  );
}
