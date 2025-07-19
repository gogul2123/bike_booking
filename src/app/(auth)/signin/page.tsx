// "use client";

// import React, { useState } from "react";
// import { useForm, ControllerRenderProps } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { AiOutlineArrowRight } from "react-icons/ai";
// import { RiMotorbikeFill } from "react-icons/ri";
// import { IoEye, IoEyeOff } from "react-icons/io5";
// import { CiMail } from "react-icons/ci";
// import { MdOutlineLock } from "react-icons/md";

// // Validation schemas
// const signInSchema = z.object({
//   email: z.string().email("Please enter a valid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// const forgotPasswordSchema = z.object({
//   email: z.string().email("Please enter a valid email address"),
// });

// type SignInFormData = z.infer<typeof signInSchema>;
// type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [resetSent, setResetSent] = useState(false);

//   const signInForm = useForm<SignInFormData>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const forgotPasswordForm = useForm<ForgotPasswordFormData>({
//     resolver: zodResolver(forgotPasswordSchema),
//     defaultValues: {
//       email: "",
//     },
//   });

//   const handleSignIn = async (data: SignInFormData) => {
//     setIsLoading(true);
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       console.log("Sign in data:", data);
//       // Add your sign in logic here
//     } catch (error) {
//       console.error("Sign in error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleForgotPassword = async (data: ForgotPasswordFormData) => {
//     setIsLoading(true);
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       console.log("Password reset sent to:", data.email);
//       setResetSent(true);
//     } catch (error) {
//       console.error("Password reset error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const goBackToSignIn = () => {
//     setShowForgotPassword(false);
//     setResetSent(false);
//     forgotPasswordForm.reset();
//   };

//   const goToForgotPassword = () => {
//     setShowForgotPassword(true);
//     signInForm.clearErrors();
//   };

//   if (showForgotPassword) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-[#141414] via-gray-800 to-[#141414] flex items-center justify-center p-4">
//         <div className="w-full max-w-sm mx-auto">
//           <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-lg border border-white/20">
//             {/* Header */}
//             <div className="text-center space-y-4">
//               <div className="flex justify-center">
//                 <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-tan-600 to-tan-700 rounded-xl shadow-lg text-white">
//                   <MdOutlineLock />
//                 </div>
//               </div>
//               <h1 className="text-2xl font-bold text-black">
//                 {resetSent ? "Check Your Email" : "Forgot Password?"}
//               </h1>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 {resetSent
//                   ? "We've sent a password reset link to your email address."
//                   : "Enter your email address and we'll send you a link to reset your password."}
//               </p>
//             </div>

//             {resetSent ? (
//               <div className="space-y-6">
//                 <div className="p-4 bg-gradient-to-r from-tan-50 to-tan-100 border border-tan-200 rounded-xl">
//                   <div className="flex items-center gap-3">
//                     <CiMail className="h-5 w-5 text-tan-600" />
//                     <div>
//                       <p className="text-sm text-gray-700">
//                         Password reset link sent to
//                       </p>
//                       <p className="font-semibold text-tan-700">
//                         {forgotPasswordForm.getValues("email")}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <Button
//                   onClick={goBackToSignIn}
//                   className="w-full bg-gradient-to-r from-tan-600 to-tan-700 hover:from-tan-700 hover:to-tan-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
//                 >
//                   Back to Sign In
//                 </Button>
//               </div>
//             ) : (
//               <Form {...forgotPasswordForm}>
//                 <div className="space-y-6">
//                   <FormField
//                     control={forgotPasswordForm.control}
//                     name="email"
//                     render={({
//                       field,
//                     }: {
//                       field: ControllerRenderProps<
//                         ForgotPasswordFormData,
//                         "email"
//                       >;
//                     }) => (
//                       <FormItem>
//                         <FormLabel className="text-black font-medium text-sm">
//                           Email Address
//                         </FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <CiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                             <Input
//                               {...field}
//                               type="email"
//                               placeholder="Enter your email"
//                               className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none"
//                             />
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <div className="space-y-3">
//                     <Button
//                       type="submit"
//                       disabled={isLoading}
//                       onClick={forgotPasswordForm.handleSubmit(
//                         handleForgotPassword
//                       )}
//                       className="w-full bg-gradient-to-r from-tan-600 to-tan-700 hover:from-tan-700 hover:to-tan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
//                     >
//                       {isLoading ? (
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       ) : (
//                         <>
//                           Send Reset Link
//                           <AiOutlineArrowRight className="w-4 h-4" />
//                         </>
//                       )}
//                     </Button>
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       onClick={goBackToSignIn}
//                       className="w-full text-tan-600 hover:text-tan-700 hover:bg-tan-50 py-2 rounded-xl font-medium transition-colors"
//                     >
//                       Back to Sign In
//                     </Button>
//                   </div>
//                 </div>
//               </Form>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#141414] via-gray-800 to-[#141414] flex items-center justify-center p-4">
//       <div className="w-full max-w-sm mx-auto">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-lg border border-white/20">
//           {/* Header */}
//           <div className="text-center space-y-4">
//             <div className="flex justify-center">
//               <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-tan-600 to-tan-700 rounded-xl shadow-lg text-white">
//                 <RiMotorbikeFill />
//               </div>
//             </div>
//             <h1 className="text-2xl font-bold text-black">Welcome Back</h1>
//             <p className="text-gray-600 text-sm">
//               Sign in to your BikeRent account
//             </p>
//           </div>

//           {/* Sign In Form */}
//           <Form {...signInForm}>
//             <div className="space-y-6">
//               <div className="space-y-4">
//                 {/* Email Field */}
//                 <FormField
//                   control={signInForm.control}
//                   name="email"
//                   render={({
//                     field,
//                   }: {
//                     field: ControllerRenderProps<SignInFormData, "email">;
//                   }): React.JSX.Element => {
//                     return (
//                       <FormItem>
//                         <FormLabel className="text-black font-medium text-sm">
//                           Email Address
//                         </FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <CiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                             <Input
//                               {...field}
//                               type="email"
//                               placeholder="Enter your email"
//                               className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none"
//                             />
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     );
//                   }}
//                 />

//                 {/* Password Field */}
//                 <FormField
//                   control={signInForm.control}
//                   name="password"
//                   render={({
//                     field,
//                   }: {
//                     field: ControllerRenderProps<SignInFormData, "password">;
//                   }) => (
//                     <FormItem>
//                       <FormLabel className="text-black font-medium text-sm">
//                         Password
//                       </FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <MdOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                           <Input
//                             {...field}
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Enter your password"
//                             className="pl-10 pr-10 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none"
//                           />
//                           <button
//                             type="button"
//                             onClick={togglePasswordVisibility}
//                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                           >
//                             {showPassword ? <IoEyeOff /> : <IoEye />}
//                           </button>
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Forgot Password Link */}
//                 <div className="text-right">
//                   <button
//                     type="button"
//                     onClick={goToForgotPassword}
//                     className="text-tan-600 hover:text-tan-700 text-sm font-medium transition-colors"
//                   >
//                     Forgot Password?
//                   </button>
//                 </div>
//               </div>

//               {/* Sign In Button */}
//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 onClick={signInForm.handleSubmit(handleSignIn)}
//                 className="w-full bg-gradient-to-r from-tan-600 to-tan-700 hover:from-tan-700 hover:to-tan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
//               >
//                 {isLoading ? (
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <>Sign In</>
//                 )}
//               </Button>
//             </div>
//           </Form>

//           {/* Footer */}
//           <div className="text-center pt-4 border-t border-gray-100">
//             <p className="text-gray-600 text-sm">
//               Don't have an account?{" "}
//               <Button
//                 variant={"none"}
//                 className="text-tan-600 hover:text-tan-700 font-medium transition-colors"
//               >
//                 Sign Up
//               </Button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { useForm, ControllerRenderProps } from "react-hook-form";
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
import { RiMotorbikeFill } from "react-icons/ri";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { MdOutlineLock, MdOutlineVerifiedUser } from "react-icons/md";

// Validation schemas
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

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

type SignInFormData = z.infer<typeof signInSchema>;
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const forgotPasswordForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetPasswordForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSignIn = async (data: SignInFormData) => {
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

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call to send OTP
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

  const handleOtpVerification = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setOtpError("Please enter all 6 digits");
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError("");

    try {
      // Simulate OTP verification API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("OTP verified:", otpCode);

      // On successful verification, show reset password form
      setShowOtpVerification(false);
      setShowResetPassword(true);
    } catch (error) {
      setOtpError("Invalid OTP. Please try again.");
      console.error("OTP verification error:", error);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      // Simulate password reset API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Password reset successful for:", userEmail);

      // Reset all states and go back to sign in
      resetAllStates();
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      // Simulate resend OTP API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("OTP resent to:", userEmail);
      setOtpError("");
      setOtp(["", "", "", "", "", ""]);
    } catch (error) {
      setOtpError("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetAllStates = () => {
    setShowForgotPassword(false);
    setShowOtpVerification(false);
    setShowResetPassword(false);
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    setUserEmail("");
    forgotPasswordForm.reset();
    resetPasswordForm.reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const goBackToSignIn = () => {
    resetAllStates();
    signInForm.clearErrors();
  };

  const goToForgotPassword = () => {
    setShowForgotPassword(true);
    signInForm.clearErrors();
  };

  const goBackToEmail = () => {
    setShowOtpVerification(false);
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
  };

  // OTP Verification Screen
  if (showOtpVerification) {
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
                  onClick={goBackToEmail}
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

  // Reset Password Screen
  if (showResetPassword) {
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
                    render={({ field }) => (
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
                              {showPassword ? <IoEyeOff /> : <IoEye />}
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
                    render={({ field }) => (
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
                              {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
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
                    onClick={resetPasswordForm.handleSubmit(
                      handleResetPassword
                    )}
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

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={goBackToSignIn}
                    className="w-full text-tan-600 hover:text-tan-700 hover:bg-tan-50 py-2 rounded-xl font-medium transition-colors"
                  >
                    Back to Sign In
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  // Forgot Password Screen
  if (showForgotPassword) {
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
                    onClick={forgotPasswordForm.handleSubmit(
                      handleForgotPassword
                    )}
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
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={goBackToSignIn}
                    className="w-full text-tan-600 hover:text-tan-700 hover:bg-tan-50 py-2 rounded-xl font-medium transition-colors"
                  >
                    Back to Sign In
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  // Main Sign In Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141414] via-gray-800 to-[#141414] flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-lg border border-white/20">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-tan-600 to-tan-700 rounded-xl shadow-lg text-white">
                <RiMotorbikeFill />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-black">Welcome Back</h1>
            <p className="text-gray-600 text-sm">
              Sign in to your BikeRent account
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
                  }): React.JSX.Element => {
                    return (
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
                    );
                  }}
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
                            {showPassword ? <IoEyeOff /> : <IoEye />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Forgot Password Link */}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={goToForgotPassword}
                    className="text-tan-600 hover:text-tan-700 text-sm font-medium transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                onClick={signInForm.handleSubmit(handleSignIn)}
                className="w-full bg-gradient-to-r from-tan-600 to-tan-700 hover:from-tan-700 hover:to-tan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Sign In</>
                )}
              </Button>
            </div>
          </Form>

          {/* Footer */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button
                variant={"none"}
                className="text-tan-600 hover:text-tan-700 font-medium transition-colors"
              >
                Sign Up
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}