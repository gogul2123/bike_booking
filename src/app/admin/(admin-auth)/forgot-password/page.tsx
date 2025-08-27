// app/(admin)/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPasswordForm, { OtpVerification } from "@/components/auth/ForgetPasswordForm";

interface ForgotPasswordData {
  email: string;
}

export default function AdminForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleForgotPassword = async (data: ForgotPasswordData) => {
    setIsLoading(true);
    try {
      // Send OTP API call for admin
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Admin OTP sent to:", data.email);
      setUserEmail(data.email);
      setShowOtpVerification(true);
    } catch (error) {
      console.error("Admin OTP send error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (otp: string) => {
    // Simulate OTP verification API call for admin
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Admin OTP verified:", otp);

    // Redirect to admin reset password page
    router.push("/admin/reset-password?token=admin-sample-token");
  };

  const handleResendOtp = async () => {
    // Simulate resend OTP API call for admin
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Admin OTP resent to:", userEmail);
  };

  const handleBackToEmail = () => {
    setShowOtpVerification(false);
    setUserEmail("");
  };

  if (showOtpVerification) {
    return (
      <OtpVerification
        role="admin"
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
      role="admin" 
      onSubmit={handleForgotPassword} 
      isLoading={isLoading} 
    />
  );
}
