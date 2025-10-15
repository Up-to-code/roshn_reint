// FILE: components/forms/user-auth-form.tsx
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userAuthSchema } from "@/lib/validations/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "../shared/icons";
import { authClient } from "@/lib/auth/auth-client";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "login" | "register";
}

// Define schemas for login and register
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(3, "Name must be at least 3 characters").max(32, "Name must be at most 32 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export function UserAuthForm({ 
  className, 
  type = "login",
  ...props 
}: UserAuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(type === "register" ? registerSchema : loginSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(type === "register" && { name: "" }),
    },
  });

  async function onSubmit(data: LoginFormData | RegisterFormData) {
    setIsLoading(true);

    try {
      if (type === "register") {
        const registerData = data as RegisterFormData;
        const result = await authClient.signUp.email({
          email: registerData.email.toLowerCase(),
          password: registerData.password,
          name: registerData.name,
        });

        if (result.error) {
          throw new Error(result.error.message || "Failed to create account");
        }

        if (result.data) {
          toast({
            title: "Success!",
            description: "Your account has been created. You can now sign in.",
          });

          // Redirect to login after successful registration
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        }
      } else {
        const loginData = data as LoginFormData;
        const result = await authClient.signIn.email({
          email: loginData.email.toLowerCase(),
          password: loginData.password,
        });

        if (result.error) {
          throw new Error(result.error.message || "Invalid email or password");
        }

        if (result.data) {
          toast({
            title: "Success!",
            description: "You have been signed in.",
          });

          // Redirect to callback URL or dashboard
          setTimeout(() => {
            window.location.href = callbackUrl;
          }, 500);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {type === "register" && (
            <div className="grid gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                {...register("name")}
              />
              {"name" in errors && errors.name && (
                <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>
          )}
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              autoCapitalize="none"
              autoComplete={type === "register" ? "new-password" : "current-password"}
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {type === "register" ? "Sign Up" : "Sign In"}
          </Button>
        </div>
      </form>
    </div>
  );
}