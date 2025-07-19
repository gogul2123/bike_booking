"use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Eye, EyeOff, Mail, Lock, Bike, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// // Input field configurations
// const signInFields = [
//   {
//     name: "email",
//     label: "Email Address",
//     type: "email",
//     placeholder: "Enter your email",
//     icon: Mail,
//   },
//   {
//     name: "password",
//     label: "Password",
//     type: "password",
//     placeholder: "Enter your password",
//     icon: Lock,
//   },
// ];

// const forgotPasswordFields = [
//   {
//     name: "email",
//     label: "Email Address",
//     type: "email",
//     placeholder: "Enter your email",
//     icon: Mail,
//   },
// ];

// // Validation schemas
// const signInSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email is required")
//     .email("Please enter a valid email address"),
//   password: z
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .max(100, "Password is too long"),
// });

// const forgotPasswordSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email is required")
//     .email("Please enter a valid email address"),
// });

// export default function SignInPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [resetSent, setResetSent] = useState(false);

//   // Sign in form
//   const signInForm = useForm({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   // Forgot password form
//   const forgotPasswordForm = useForm({
//     resolver: zodResolver(forgotPasswordSchema),
//     defaultValues: {
//       email: "",
//     },
//   });

//   const onSignInSubmit = async (data: any) => {
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

//   const onForgotPasswordSubmit = async (data: any) => {
//     setIsLoading(true);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       console.log("Password reset sent to:", data.email);
//       setResetSent(true);
//       // Add your password reset logic here
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

//   const renderFormField = (
//     field: any,
//     form: any,
//     showPasswordToggle = false
//   ) => {
//     const IconComponent = field.icon;

//     return (
//       <FormField
//         key={field.name}
//         control={form.control}
//         name={field.name}
//         render={({ field: formField }) => (
//           <FormItem>
//             <FormLabel className="text-gray-700 font-medium">
//               {field.label}
//             </FormLabel>
//             <FormControl>
//               <div className="relative">
//                 <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <Input
//                   type={
//                     field.type === "password" && showPassword
//                       ? "text"
//                       : field.type
//                   }
//                   placeholder={field.placeholder}
//                   {...formField}
//                   className={`pl-10 ${
//                     showPasswordToggle ? "pr-10" : ""
//                   } py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 transition-colors data-[invalid]:border-red-300 data-[invalid]:focus:border-red-500`}
//                 />
//                 {showPasswordToggle && (
//                   <button
//                     type="button"
//                     onClick={togglePasswordVisibility}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-5 h-5" />
//                     ) : (
//                       <Eye className="w-5 h-5" />
//                     )}
//                   </button>
//                 )}
//               </div>
//             </FormControl>
//             <FormMessage className="text-red-500 text-sm" />
//           </FormItem>
//         )}
//       />
//     );
//   };

//   if (showForgotPassword) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
//         <div className="w-full max-w-sm mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
//             {/* Header */}
//             <div className="text-center space-y-2">
//               <div className="flex justify-center">
//                 <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
//                   <Lock className="w-8 h-8 text-white" />
//                 </div>
//               </div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 {resetSent ? "Check Your Email" : "Forgot Password?"}
//               </h1>
//               <p className="text-gray-600 text-sm">
//                 {resetSent
//                   ? "We've sent a password reset link to your email address."
//                   : "Enter your email address and we'll send you a link to reset your password."}
//               </p>
//             </div>

//             {resetSent ? (
//               <div className="space-y-4">
//                 <Alert className="border-amber-200 bg-amber-50">
//                   <Mail className="h-4 w-4 text-amber-600" />
//                   <AlertDescription className="text-amber-800">
//                     Password reset link sent to{" "}
//                     <strong>{forgotPasswordForm.getValues("email")}</strong>
//                   </AlertDescription>
//                 </Alert>

//                 <Button
//                   onClick={goBackToSignIn}
//                   className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition-colors"
//                 >
//                   Back to Sign In
//                 </Button>
//               </div>
//             ) : (
//               <Form {...forgotPasswordForm}>
//                 <div className="space-y-4">
//                   {forgotPasswordFields.map((field) =>
//                     renderFormField(field, forgotPasswordForm)
//                   )}

//                   <div className="space-y-3 pt-2">
//                     <Button
//                       type="button"
//                       onClick={forgotPasswordForm.handleSubmit(
//                         onForgotPasswordSubmit
//                       )}
//                       disabled={isLoading}
//                       className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
//                     >
//                       {isLoading ? (
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       ) : (
//                         <>
//                           Send Reset Link
//                           <ArrowRight className="w-4 h-4" />
//                         </>
//                       )}
//                     </Button>

//                     <Button
//                       type="button"
//                       variant="ghost"
//                       onClick={goBackToSignIn}
//                       className="w-full text-amber-600 hover:text-amber-700 hover:bg-amber-50 py-2 rounded-xl font-medium transition-colors"
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
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-sm mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
//           {/* Header */}
//           <div className="text-center space-y-2">
//             <div className="flex justify-center">
//               <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
//                 <Bike className="w-8 h-8 text-white" />
//               </div>
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
//             <p className="text-gray-600 text-sm">
//               Sign in to your BikeRent account
//             </p>
//           </div>

//           {/* Sign In Form */}
//           <Form {...signInForm}>
//             <div className="space-y-4">
//               {signInFields.map((field) =>
//                 renderFormField(field, signInForm, field.type === "password")
//               )}

//               {/* Forgot Password Link */}
//               <div className="text-right">
//                 <button
//                   type="button"
//                   onClick={goToForgotPassword}
//                   className="text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>

//               {/* Sign In Button */}
//               <Button
//                 type="button"
//                 onClick={signInForm.handleSubmit(onSignInSubmit)}
//                 disabled={isLoading}
//                 className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
//               >
//                 {isLoading ? (
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <>
//                     Sign In
//                     <ArrowRight className="w-4 h-4" />
//                   </>
//                 )}
//               </Button>
//             </div>
//           </Form>

//           {/* Footer */}
//           <div className="text-center pt-4 border-t border-gray-100">
//             <p className="text-gray-600 text-sm">
//               Don't have an account?{" "}
//               <button className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
//                 Sign Up
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FaMotorcycle } from "react-icons/fa";

// Motorcycle icon component
const MotorcycleIcon = () => (
  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm14.5 3c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM12 4.5c0-1.11-.89-2-2-2s-2 .89-2 2 .89 2 2 2 2-.89 2-2zM21 14h-3.5l-1.19-3.83C16.07 9.47 15.38 9 14.58 9H12.5c-.37 0-.72.1-1.03.26l-1.88.94c-.39.2-.59.63-.59 1.08 0 .83.94 1.28 1.56.72L12 10.5h2l1.5 4.84c.04.17.01.34-.08.49-.13.22-.35.17-.35.17H9.5C8.57 16 8 16.58 8 17.5S8.57 19 9.5 19H21c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1z"/>
  </svg>
);

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  
  type Errors = {
    email?: string;
    password?: string;
    forgotEmail?: string;
  };
  const [errors, setErrors] = useState<Errors>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Sign in data:", { email, password });
        // Add your sign in logic here
      } catch (error) {
        console.error("Sign in error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (!forgotEmail) {
      newErrors.forgotEmail = "Email is required";
    } else if (!validateEmail(forgotEmail)) {
      newErrors.forgotEmail = "Please enter a valid email address";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Password reset sent to:", forgotEmail);
        setResetSent(true);
      } catch (error) {
        console.error("Password reset error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goBackToSignIn = () => {
    setShowForgotPassword(false);
    setResetSent(false);
    setForgotEmail("");
    setErrors({});
  };

  const goToForgotPassword = () => {
    setShowForgotPassword(true);
    setErrors({});
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-lg border shadow-lg p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-xl shadow-sm">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                  {resetSent ? "Check your email" : "Forgot your password?"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {resetSent
                    ? "We've sent a password reset link to your email address."
                    : "Enter your email address and we'll send you a link to reset your password."}
                </p>
              </div>
            </div>

            {resetSent ? (
              <div className="space-y-4">
                <Alert className="border-[#AC9456]/20 bg-[#AC9456]/5">
                  <AlertDescription>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-[#AC9456]" />
                      <div>
                        <p className="text-sm text-gray-700">
                          Password reset link sent to
                        </p>
                        <p className="text-sm font-medium text-[#9B8449]">{forgotEmail}</p>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>

                <Button
                  type="button"
                  onClick={goBackToSignIn}
                  className="w-full px-6 py-5 font-bold bg-gradient-to-r from-[#AC9456] to-[#9B8449] hover:from-[#9B8449] hover:to-[#AC9456] text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                >
                  Back to Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="Enter your email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className={`pl-10 ${errors.forgotEmail ? 'border-red-300 focus-visible:ring-red-500' : ''}`}
                    />
                  </div>
                  {errors.forgotEmail && (
                    <p className="text-sm text-red-500">{errors.forgotEmail}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-5 font-bold bg-gradient-to-r from-[#AC9456] to-[#9B8449] hover:from-[#9B8449] hover:to-[#AC9456] text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    onClick={goBackToSignIn}
                    variant="ghost"
                    className="w-full text-[#AC9456] hover:text-[#9B8449] hover:bg-[#AC9456]/5"
                  >
                    Back to Sign In
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg border shadow-lg p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-xl shadow-md">
                <FaMotorcycle className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your BikeRent account
              </p>
            </div>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-red-300 focus-visible:ring-red-500' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-300 focus-visible:ring-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={goToForgotPassword}
                  className="text-sm font-medium text-[#AC9456] hover:text-[#9B8449] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              variant="gold"
              className="px-6 py-5 font-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => router.push('/signup')}
                className="font-medium text-[#AC9456] hover:text-[#9B8449] transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}