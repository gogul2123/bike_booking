"use client";

import React, { useState } from "react";
import { useForm, type ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RiMotorbikeFill } from "react-icons/ri";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { MdOutlineLock } from "react-icons/md";
import Link from "next/link";

// Validation schema
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

interface SignInFormProps {
  role: "user" | "admin";
  onSubmit: (data: SignInFormData) => Promise<void>;
  isLoading: boolean;
}

export default function SignInForm({
  role,
  onSubmit,
  isLoading,
}: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isAdmin = role === "admin";
  const forgotPasswordPath = isAdmin
    ? "/admin/forgot-password"
    : "/forgot-password";
  const signUpPath = "/sign-up";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141414] via-gray-800 to-[#141414] flex items-center justify-center p-4">
      <div className="h-full w-full max-w-sm mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-lg border border-white/20">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-tan-600 to-tan-700 rounded-xl shadow-lg text-white">
                <RiMotorbikeFill className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-black">
              Welcome Back{isAdmin ? ", Admin" : ""}
            </h1>
            <p className="text-gray-600 text-sm">
              Sign in to your {isAdmin ? "admin panel" : "BikeRent account"}
            </p>
          </div>

          {/* Sign In Form */}
          <Form {...signInForm}>
            <div className="space-y-6">
              <div className="space-y-4">
                {/* Email Field */}
                <FormField
                  control={signInForm.control}
                  name="email"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<SignInFormData, "email">;
                  }) => (
                    <FormItem>
                      <FormLabel className="text-black font-medium text-sm">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <CiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={signInForm.control}
                  name="password"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<SignInFormData, "password">;
                  }) => (
                    <FormItem>
                      <FormLabel className="text-black font-medium text-sm">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MdOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? (
                              <IoEyeOff className="w-5 h-5" />
                            ) : (
                              <IoEye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link href={forgotPasswordPath}>
                    <button
                      type="button"
                      className="text-tan-600 hover:text-tan-700 text-sm font-medium transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </Link>
                </div>
              </div>

              {/* Error Message */}
              {signInForm.formState.errors.root && (
                <div className="text-center">
                  <p className="text-red-500 text-sm">
                    {signInForm.formState.errors.root.message}
                  </p>
                </div>
              )}

              {/* Sign In Button */}
              <Button
                variant={"default"}
                type="submit"
                disabled={isLoading}
                onClick={signInForm.handleSubmit(onSubmit)}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </Form>

          {/* Footer - Only show for user role */}
          {!isAdmin && (
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link href={signUpPath}>
                  <Button
                    variant="ghost"
                    className="text-tan-600 hover:text-tan-700 font-medium transition-colors p-0 h-auto"
                  >
                    Sign Up
                  </Button>
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
