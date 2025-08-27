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
import { AiOutlineArrowRight } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { MdOutlineLock, MdOutlineVerifiedUser } from "react-icons/md";
import Link from "next/link";

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  role: "user" | "admin";
  onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
  isLoading: boolean;
}

export default function ForgotPasswordForm({ role, onSubmit, isLoading }: ForgotPasswordFormProps) {
  const forgotPasswordForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

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
            <h1 className="text-2xl font-bold text-black">
              Forgot Password?
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Enter your email address and we'll send you a verification code
              to reset your password.
            </p>
          </div>

          <Form {...forgotPasswordForm}>
            <div className="space-y-6">
              <FormField
                control={forgotPasswordForm.control}
                name="email"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    ForgotPasswordFormData,
                    "email"
                  >;
                }) => (
                  <FormItem>
                    <FormLabel className="text-black font-medium text-sm">
                      Email Address
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

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  onClick={forgotPasswordForm.handleSubmit(onSubmit)}
                  className="w-full bg-gradient-to-r from-tan-600 to-tan-700 hover:from-tan-700 hover:to-tan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Verification Code
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

// OTP Verification Component
interface OtpVerificationProps {
  role: "user" | "admin";
  userEmail: string;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
}

export function OtpVerification({ 
  role, 
  userEmail, 
  onVerify, 
  onResend, 
  onBack, 
  isLoading 
}: OtpVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const handleOtpVerification = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setOtpError("Please enter all 6 digits");
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError("");

    try {
      await onVerify(otpCode);
    } catch (error) {
      setOtpError("Invalid OTP. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await onResend();
      setOtpError("");
      setOtp(["", "", "", "", "", ""]);
    } catch (error) {
      setOtpError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141414] via-gray-800 to-[#141414] flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-lg border border-white/20">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-tan-600 to-tan-700 rounded-xl shadow-lg text-white">
                <MdOutlineVerifiedUser className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-black">Verify OTP</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Enter the 6-digit verification code sent to your email address.
            </p>
          </div>

          <div className="space-y-6">
            {/* OTP Input */}
            <div className="space-y-2">
              <label className="text-black font-medium text-sm">
                Verification Code
              </label>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[index] = e.target.value;
                      setOtp(newOtp);

                      // Auto-focus next input
                      if (e.target.value && index < 5) {
                        const nextInput = document.querySelector(
                          `input[data-index="${index + 1}"]`
                        ) as HTMLInputElement | null;
                        nextInput?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      // Handle backspace
                      if (e.key === "Backspace" && !otp[index] && index > 0) {
                        const prevInput = document.querySelector(
                          `input[data-index="${index - 1}"]`
                        ) as HTMLInputElement | null;
                        prevInput?.focus();
                      }
                    }}
                    data-index={index}
                    className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-200 rounded-xl focus:border-tan-500 focus:outline-none transition-colors"
                  />
                ))}
              </div>
              {otpError && (
                <p className="text-red-500 text-sm text-center">{otpError}</p>
              )}
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="text-tan-600 hover:text-tan-700 font-medium disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleOtpVerification}
                disabled={isVerifyingOtp || otp.some((digit) => !digit)}
                className="w-full bg-gradient-to-r from-tan-600 to-tan-700 hover:from-tan-700 hover:to-tan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {isVerifyingOtp ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Verify OTP
                    <AiOutlineArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={onBack}
                className="w-full text-tan-600 hover:text-tan-700 hover:bg-tan-50 py-2 rounded-xl font-medium transition-colors"
              >
                Back to Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}