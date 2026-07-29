"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";
import { fetcher, FetchError } from "@/lib/fetcher";
import { authApiResponseSchema } from "@/lib/api/contracts";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      await fetcher(
        "auth",
        {
          method: "POST",
          body: JSON.stringify(values),
        },
        authApiResponseSchema,
      );
      router.push("/dashboard");
    } catch (caught) {
      const message =
        caught instanceof FetchError &&
        typeof caught.details === "object" &&
        caught.details !== null &&
        "error" in caught.details &&
        typeof caught.details.error === "object" &&
        caught.details.error !== null &&
        "message" in caught.details.error &&
        typeof caught.details.error.message === "string"
          ? caught.details.error.message
          : "Unable to sign in right now.";

      setError("root", { message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-4"
      noValidate
    >
      <p className="text-sm text-muted-foreground">
        Demo authentication validates the request but does not create a session.
      </p>
      <FormField id="login-email" label="Email" error={errors.email?.message}>
        <Input
          type="email"
          autoComplete="username"
          placeholder="Email"
          {...register("email")}
        />
      </FormField>
      <FormField
        id="login-password"
        label="Password"
        error={errors.password?.message}
      >
        <Input
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          {...register("password")}
        />
      </FormField>
      {errors.root?.message && (
        <p role="alert" aria-live="assertive" className="form-error">
          {errors.root.message}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Login"}
      </Button>
    </form>
  );
}
