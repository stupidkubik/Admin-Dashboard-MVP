"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { fetcher, FetchError } from "@/lib/fetcher";
import type { AuthResponse } from "@/lib/api/contracts";
import type { ApiSuccess } from "@/lib/api/response";

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
      await fetcher<ApiSuccess<AuthResponse>>("auth", {
        method: "POST",
        body: JSON.stringify(values),
      });
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
    >
      <p className="text-sm text-muted-foreground">
        Demo authentication validates the request but does not create a session.
      </p>
      <div>
        <Input type="email" placeholder="Email" {...register("email")} />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      {errors.root?.message && (
        <p role="alert" className="text-sm text-red-600">
          {errors.root.message}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Login"}
      </Button>
    </form>
  );
}
