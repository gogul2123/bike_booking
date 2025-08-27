// app/(admin)/reset-password/page.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

interface ResetPasswordData {
  newPassword: string;
  confirmPassword: string;
}

export default function AdminResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get token from URL params
  const token = searchParams?.get("token");

  const handleResetPassword = async (data: ResetPasswordData) => {
    setIsLoading(true);
    try {
      // Simulate reset password API call for admin
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (!token) {
        throw new Error("Invalid or missing token");
      }

      if (data.newPassword !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      console.log("Admin password reset successful with token:", token);

      // After successful reset → redirect to sign-in page
      router.push("/admin/sign-in");
    } catch (error) {
      console.error("Admin reset password error:", error);
      // Optionally show toast or form error here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResetPasswordForm
      role="admin"
      onSubmit={handleResetPassword}
      isLoading={isLoading}
    />
  );
}
