// app/(auth)/reset-password/page.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

interface ResetPasswordData {
  newPassword: string;
  confirmPassword: string;
}

export default function UserResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get token from URL params
  const token = searchParams?.get("token");

  const handleResetPassword = async (data: ResetPasswordData) => {
    setIsLoading(true);
    try {
      // Reset password API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Password reset successful with token:", token);
      
      // Redirect to sign in page with success message
      router.push("/sign-in?message=password-reset-success");
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // If no token, redirect to forgot password
  if (!token) {
    router.push("/forgot-password");
    return null;
  }

  return (
    <ResetPasswordForm 
      role="user" 
      onSubmit={handleResetPassword} 
      isLoading={isLoading} 
    />
  );
}