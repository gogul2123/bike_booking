// app/(auth)/reset-password/page.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { getFromLocalStorage } from "@/components/ui/encryption";
import Alert from "@/components/ui/alert";
import { useAlert } from "@/hooks/alertHook";
import { useAppContext } from "@/hooks/context";

interface ResetPasswordData {
  newPassword: string;
  confirmPassword: string;
}

export default function UserResetPasswordPage() {
  const router = useRouter();
  const { URL } = useAppContext();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();

  // Get token from URL params
  const token = searchParams?.get("token");
  const email = getFromLocalStorage("email");

  const handleResetPassword = async (data: ResetPasswordData) => {
    setIsLoading(true);
    const payload = {
      email: email,
      newPassword: data.newPassword,
    };
    try {
      const res = await fetch(`${URL}auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.status === 200) {
        showAlert("Password reset successful! Redirecting to sign in...", "success");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push("/sign-in");
      } else if (res.status === 400) {
        showAlert("Password reset failed. Please try again.", "error");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      showAlert("An unexpected error occurred. Please try again later.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    router.push("/forgot-password");
    return null;
  }

  return (
    <>
      <ResetPasswordForm
        role="user"
        onSubmit={handleResetPassword}
        isLoading={isLoading}
      />
      <Alert alert={alert} hideAlert={hideAlert} />
    </>
  );
}