"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; email: string; password: string }>({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-4"
      noValidate
    >
      <FormField id="register-name" label="Name" error={errors.name?.message}>
        <Input autoComplete="name" placeholder="Name" {...register("name")} />
      </FormField>
      <FormField
        id="register-email"
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
      <FormField
        id="register-password"
        label="Password"
        error={errors.password?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          placeholder="Password"
          {...register("password")}
        />
      </FormField>
      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
}
