// // Admin Sign In
// "use client";

// import React, { useState } from "react";
// import { useForm, type ControllerRenderProps } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useRouter } from "next/navigation";
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
// import { RiMotorbikeFill } from "react-icons/ri";
// import { IoEye, IoEyeOff } from "react-icons/io5";
// import { CiMail } from "react-icons/ci";
// import { MdOutlineLock } from "react-icons/md";

// // Validation schema
// const adminSignInSchema = z.object({
//   email: z.string().email("Please enter a valid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type AdminSignInFormData = z.infer<typeof adminSignInSchema>;

// export default function AdminSignInPage() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const adminSignInForm = useForm<AdminSignInFormData>({
//     resolver: zodResolver(adminSignInSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const handleAdminSignIn = async (data: AdminSignInFormData) => {
//     setIsLoading(true);
//     try {
//       // Dummy API call - replace with actual API endpoint
//       await new Promise((resolve) => setTimeout(resolve, 2000));
      
//       // Dummy validation - replace with actual API response handling
//       if (data.email === "admin@bikerent.com" && data.password === "admin123") {
//         console.log("Admin sign in successful:", data);
//         // Redirect to admin dashboard
//         // router.push("/admin/dashboard");
//       } else {
//         // Handle invalid credentials
//         adminSignInForm.setError("root", {
//           message: "Invalid email or password"
//         });
//       }
//     } catch (error) {
//       console.error("Admin sign in error:", error);
//       adminSignInForm.setError("root", {
//         message: "Something went wrong. Please try again."
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const goToForgotPassword = () => {
//     // Navigate to forgot password page
//     // router.push("/admin/forgot-password");
//     console.log("Navigate to admin forgot password page");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#141414] via-gray-800 to-[#141414] flex items-center justify-center p-4">
//       <div className="h-full w-full max-w-sm mx-auto">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-lg border border-white/20">
//           {/* Header */}
//           <div className="text-center space-y-4">
//             <div className="flex justify-center">
//               <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-tan-600 to-tan-700 rounded-xl shadow-lg text-white">
//                 <RiMotorbikeFill className="w-8 h-8" />
//               </div>
//             </div>
//             <h1 className="text-2xl font-bold text-black">Welcome Back, Admin</h1>
//             <p className="text-gray-600 text-sm">
//               Sign in to your admin panel
//             </p>
//           </div>

//           {/* Admin Sign In Form */}
//           <Form {...adminSignInForm}>
//             <div className="space-y-6">
//               <div className="space-y-4">
//                 {/* Email Field */}
//                 <FormField
//                   control={adminSignInForm.control}
//                   name="email"
//                   render={({
//                     field,
//                   }: {
//                     field: ControllerRenderProps<AdminSignInFormData, "email">;
//                   }) => (
//                     <FormItem>
//                       <FormLabel className="text-black font-medium text-sm">
//                         Email
//                       </FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <CiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                           <Input
//                             {...field}
//                             type="email"
//                             placeholder="Enter your email"
//                             className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none"
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Password Field */}
//                 <FormField
//                   control={adminSignInForm.control}
//                   name="password"
//                   render={({
//                     field,
//                   }: {
//                     field: ControllerRenderProps<AdminSignInFormData, "password">;
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
//                             {showPassword ? <IoEyeOff className="w-5 h-5" /> : <IoEye className="w-5 h-5" />}
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

//               {/* Error Message */}
//               {adminSignInForm.formState.errors.root && (
//                 <div className="text-center">
//                   <p className="text-red-500 text-sm">
//                     {adminSignInForm.formState.errors.root.message}
//                   </p>
//                 </div>
//               )}

//               {/* Sign In Button */}
//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 onClick={adminSignInForm.handleSubmit(handleAdminSignIn)}
//                 className="w-full bg-gradient-to-r from-tan-600 to-tan-700 hover:from-tan-700 hover:to-tan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
//               >
//                 {isLoading ? (
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   "Sign In"
//                 )}
//               </Button>
//             </div>
//           </Form>
//         </div>
//       </div>
//       </div>
//     );
//   }

// app/(admin)/sign-in/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignInForm from "@/components/auth/SignInForm";

interface SignInData {
  email: string;
  password: string;
}

export default function AdminSignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (data: SignInData) => {
    setIsLoading(true);
    try {
      // Admin sign in API call - with dummy validation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      if (data.email === "admin@bikerent.com" && data.password === "admin123") {
        console.log("Admin sign in successful:", data);
        // Redirect to admin dashboard
        // router.push("/admin/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Admin sign in error:", error);
      // Handle error - could set form errors here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignInForm 
      role="admin" 
      onSubmit={handleSignIn} 
      isLoading={isLoading} 
    />
  );
}