"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, Bike, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Input field configurations
const signInFields = [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email",
    icon: Mail,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    icon: Lock,
  },
];

const forgotPasswordFields = [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email",
    icon: Mail,
  },
];

// Validation schemas
const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
});

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Sign in form
  const signInForm = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Forgot password form
  const forgotPasswordForm = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSignInSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Sign in data:", data);
      // Add your sign in logic here
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onForgotPasswordSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Password reset sent to:", data.email);
      setResetSent(true);
      // Add your password reset logic here
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goBackToSignIn = () => {
    setShowForgotPassword(false);
    setResetSent(false);
    forgotPasswordForm.reset();
  };

  const goToForgotPassword = () => {
    setShowForgotPassword(true);
    signInForm.clearErrors();
  };

  const renderFormField = (
    field: any,
    form: any,
    showPasswordToggle = false
  ) => {
    const IconComponent = field.icon;

    return (
      <FormField
        key={field.name}
        control={form.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">
              {field.label}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type={
                    field.type === "password" && showPassword
                      ? "text"
                      : field.type
                  }
                  placeholder={field.placeholder}
                  {...formField}
                  className={`pl-10 ${
                    showPasswordToggle ? "pr-10" : ""
                  } py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 transition-colors data-[invalid]:border-red-300 data-[invalid]:focus:border-red-500`}
                />
                {showPasswordToggle && (
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
            </FormControl>
            <FormMessage className="text-red-500 text-sm" />
          </FormItem>
        )}
      />
    );
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
        <div className="w-full max-w-sm mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                {resetSent ? "Check Your Email" : "Forgot Password?"}
              </h1>
              <p className="text-gray-600 text-sm">
                {resetSent
                  ? "We've sent a password reset link to your email address."
                  : "Enter your email address and we'll send you a link to reset your password."}
              </p>
            </div>

            {resetSent ? (
              <div className="space-y-4">
                <Alert className="border-amber-200 bg-amber-50">
                  <Mail className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    Password reset link sent to{" "}
                    <strong>{forgotPasswordForm.getValues("email")}</strong>
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={goBackToSignIn}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  Back to Sign In
                </Button>
              </div>
            ) : (
              <Form {...forgotPasswordForm}>
                <div className="space-y-4">
                  {forgotPasswordFields.map((field) =>
                    renderFormField(field, forgotPasswordForm)
                  )}

                  <div className="space-y-3 pt-2">
                    <Button
                      type="button"
                      onClick={forgotPasswordForm.handleSubmit(
                        onForgotPasswordSubmit
                      )}
                      disabled={isLoading}
                      className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Reset Link
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={goBackToSignIn}
                      className="w-full text-amber-600 hover:text-amber-700 hover:bg-amber-50 py-2 rounded-xl font-medium transition-colors"
                    >
                      Back to Sign In
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
                <Bike className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 text-sm">
              Sign in to your BikeRent account
            </p>
          </div>

          {/* Sign In Form */}
          <Form {...signInForm}>
            <div className="space-y-4">
              {signInFields.map((field) =>
                renderFormField(field, signInForm, field.type === "password")
              )}

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={goToForgotPassword}
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign In Button */}
              <Button
                type="button"
                onClick={signInForm.handleSubmit(onSignInSubmit)}
                disabled={isLoading}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </Form>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <button className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
