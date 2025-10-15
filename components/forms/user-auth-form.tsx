// FILE: components/forms/user-auth-form.tsx
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "../shared/icons";
import { authClient } from "@/lib/auth/auth-client";

// Console log for component initialization
console.log("🔧 UserAuthForm component initializing");

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "login" | "register";
}

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string()
    .min(3, "Name must be at least 3 characters")
    .max(32, "Name must be at most 32 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;
type FormData = LoginFormData | RegisterFormData;

export function UserAuthForm({ 
  className, 
  type = "login",
  ...props 
}: UserAuthFormProps) {
  console.log(`🎯 UserAuthForm rendering with type: ${type}`);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const currentSchema = type === "register" ? registerSchema : loginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(type === "register" && { name: "" }),
    },
  });

  const handleAuthSuccess = React.useCallback((message: string, redirectUrl: string, isLogin = false) => {
    console.log(`✅ ${message}`);
    toast({
      title: "Success!",
      description: message,
    });

    // Use window.location.href for login to ensure proper auth state refresh
    setTimeout(() => {
      if (isLogin) {
        console.log(`🔄 Redirecting to: ${redirectUrl}`);
        window.location.href = redirectUrl;
      } else {
        console.log(`🔄 Redirecting to login page`);
        router.push("/login");
      }
    }, 1000);
  }, [router]);

  const handleAuthError = React.useCallback((error: unknown, defaultMessage: string) => {
    const errorMessage = error instanceof Error ? error.message : defaultMessage;
    console.error(`❌ Auth error: ${errorMessage}`, error);
    
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  }, []);

  const onSubmit = React.useCallback(async (data: FormData) => {
    console.log(`📤 Form submitted with data:`, { 
      type, 
      email: data.email,
      hasName: 'name' in data 
    });
    
    setIsLoading(true);

    try {
      if (type === "register") {
        const registerData = data as RegisterFormData;
        console.log("👤 Attempting user registration");
        
        const result = await authClient.signUp.email({
          email: registerData.email.toLowerCase(),
          password: registerData.password,
          name: registerData.name,
        });

        console.log("📨 Registration API response:", result);

        if (result.error) {
          throw new Error(result.error.message || "Failed to create account");
        }

        if (result.data) {
          handleAuthSuccess(
            "Your account has been created. You can now sign in.",
            "/login",
            false
          );
        }
      } else {
        const loginData = data as LoginFormData;
        console.log("🔐 Attempting user login");
        
        const result = await authClient.signIn.email({
          email: loginData.email.toLowerCase(),
          password: loginData.password,
        });

        console.log("📨 Login API response:", result);

        if (result.error) {
          throw new Error(result.error.message || "Invalid email or password");
        }

        if (result.data) {
          handleAuthSuccess(
            "You have been signed in.",
            callbackUrl,
            true
          );
        }
      }
    } catch (error) {
      handleAuthError(error, "Something went wrong during authentication");
    } finally {
      setIsLoading(false);
      console.log("🏁 Form submission completed");
    }
  }, [type, callbackUrl, handleAuthSuccess, handleAuthError]);

  // Form field registration with proper typing
  const emailField = register("email");
  const passwordField = register("password");
  const nameField = type === "register" ? register("name") : null;

  console.log("📝 Form errors:", errors);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-4">
          {/* Name Field - Only for Registration */}
          {type === "register" && nameField && (
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
                {...nameField}
              />
              {errors && "name" in errors && errors.name && (
                <p className="px-1 text-xs text-red-600" role="alert">
                  {(errors.name as { message?: string })?.message}
                </p>
              )}
            </div>
          )}

          {/* Email Field */}
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
              {...emailField}
            />
            {errors.email && (
              <p className="px-1 text-xs text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
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
              {...passwordField}
            />
            {errors.password && (
              <p className="px-1 text-xs text-red-600" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isLoading}
            className="relative"
          >
            {isLoading && (
              <Icons.spinner 
                className="mr-2 h-4 w-4 animate-spin" 
                aria-hidden="true"
              />
            )}
            {type === "register" ? "Create Account" : "Sign In"}
            {isLoading && (
              <span className="sr-only">Processing...</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}