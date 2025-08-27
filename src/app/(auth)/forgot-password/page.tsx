// app/(auth)/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPasswordForm, { OtpVerification } from "@/components/auth/ForgetPasswordForm";

interface ForgotPasswordData {
  email: string;
}

export default function UserForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleForgotPassword = async (data: ForgotPasswordData) => {
    setIsLoading(true);
    try {
      // Send OTP API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("OTP sent to:", data.email);
      setUserEmail(data.email);
      setShowOtpVerification(true);
    } catch (error) {
      console.error("OTP send error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (otp: string) => {
    // Simulate OTP verification API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("OTP verified:", otp);

    // Redirect to reset password page
    router.push("/reset-password?token=sample-token");
  };

  const handleResendOtp = async () => {
    // Simulate resend OTP API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("OTP resent to:", userEmail);
  };

  const handleBackToEmail = () => {
    setShowOtpVerification(false);
    setUserEmail("");
  };

  if (showOtpVerification) {
    return (
      <OtpVerification
        role="user"
        userEmail={userEmail}
        onVerify={handleOtpVerification}
        onResend={handleResendOtp}
        onBack={handleBackToEmail}
        isLoading={isLoading}
      />
    );
  }

  return (
    <ForgotPasswordForm 
      role="user" 
      onSubmit={handleForgotPassword} 
      isLoading={isLoading} 
    />
  );
}