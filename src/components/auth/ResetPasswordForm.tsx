"use client";

import React, { useState } from "react";
import { useForm, type ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { AiOutlineArrowRight } from "react-icons/ai";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { MdOutlineLock } from "react-icons/md";
import Link from "next/link";

// Validation schema
const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  role: "user" | "admin";
  onSubmit: (data: ResetPasswordFormData) => Promise<void>;
  isLoading: boolean;
}

export default function ResetPasswordForm({ role, onSubmit, isLoading }: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetPasswordForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isAdmin = role === "admin";
  const signInPath = isAdmin ? "/admin/sign-in" : "/sign-in";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141414] via-gray-800 to-[#141414] flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-lg border border-white/20">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-tan-600 to-tan-700 rounded-xl shadow-lg text-white">
                <MdOutlineLock className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-black">Reset Password</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Enter your new password to complete the reset process.
            </p>
          </div>

          <Form {...resetPasswordForm}>
            <div className="space-y-6">
              <div className="space-y-4">
                {/* New Password Field */}
                <FormField
                  control={resetPasswordForm.control}
                  name="newPassword"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<ResetPasswordFormData, "newPassword">;
                  }) => (
                    <FormItem>
                      <FormLabel className="text-black font-medium text-sm">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MdOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            className="pl-10 pr-10 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <IoEyeOff className="w-5 h-5" /> : <IoEye className="w-5 h-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={resetPasswordForm.control}
                  name="confirmPassword"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<ResetPasswordFormData, "confirmPassword">;
                  }) => (
                    <FormItem>
                      <FormLabel className="text-black font-medium text-sm">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MdOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            className="pl-10 pr-10 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none"
                          />
                          <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showConfirmPassword ? <IoEyeOff className="w-5 h-5" /> : <IoEye className="w-5 h-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  onClick={resetPasswordForm.handleSubmit(onSubmit)}
                  className="w-full bg-gradient-to-r from-tan-600 to-tan-700 hover:from-tan-700 hover:to-tan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Reset Password
                      <AiOutlineArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>

                <Link href={signInPath}>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-tan-600 hover:text-tan-700 hover:bg-tan-50 py-2 rounded-xl font-medium transition-colors"
                  >
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}