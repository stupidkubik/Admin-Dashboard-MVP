"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";

const schema = z.object({ email: z.string().email() });

export default function ForgotPasswordPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({ resolver: zodResolver(schema) });

  const onSubmit = () => {
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-4"
      noValidate
    >
      <FormField
        id="forgot-password-email"
        label="Email"
        error={errors.email?.message}
      >
        <Input
          type="email"
          autoComplete="email"
          placeholder="Email"
          {...register("email")}
        />
      </FormField>
      <Button type="submit" className="w-full">
        Send reset link
      </Button>
    </form>
  );
}
