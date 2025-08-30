// app/(auth)/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPasswordForm, { OtpVerification } from "@/components/auth/ForgetPasswordForm";
import { useAppContext } from "@/hooks/context";
import { useAlert } from "@/hooks/alertHook";
import Alert from "@/components/ui/alert";

interface ForgotPasswordData {
  email: string;
}

export default function UserForgotPasswordPage() {
  const router = useRouter();
  const { alert, showAlert, hideAlert } = useAlert();
  const { URL } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleForgotPassword = async (data: ForgotPasswordData) => {
    setIsLoading(true);
    const payload = {
      email: data.email
    };
    try {
      const res = await fetch(`${URL}auth/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if(res.status === 200) {
        const result = await res.json();
        showAlert("OTP sent successfully!", "success");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setUserEmail(data.email);
        setShowOtpVerification(true);
      } else {
        showAlert("Failed to send OTP. Please try again.", "error");
      }
    } catch (error) {
      console.error("OTP send error:", error);
      showAlert("Failed to send OTP. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (otp: string) => {
    setIsLoading(true);
    const payload = {
      email: userEmail,
      otp: otp
    };
    try {
      const res = await fetch(`${URL}auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if(res.status === 200) {
        const result = await res.json();
        showAlert("OTP verified successfully!", "success");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push(`/reset-password?token=${result?.data?.token}`);
      } else {
        showAlert("Failed to verify OTP. Please try again.", "error");
      }
    } catch (error) {
      console.error("OTP send error:", error);
      showAlert("Failed to send OTP. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    showAlert("OTP resent successfully!", "success");
    handleForgotPassword({ email: userEmail });
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
    <>
      <ForgotPasswordForm 
        role="user" 
        onSubmit={handleForgotPassword} 
        isLoading={isLoading} 
      />
      <Alert alert={alert} hideAlert={hideAlert} />
    </>
  );
}