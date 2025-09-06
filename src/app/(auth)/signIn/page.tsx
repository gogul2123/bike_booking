// // Sign Up
// "use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Bike,
//   Mail,
//   Phone,
//   User2,
//   Shield,
//   CheckCircle,
//   ArrowLeft,
//   Clock,
//   UserCheck,
// } from "lucide-react";

// // Define the form schemas with Zod
// const phoneSchema = z.object({
//   phone: z
//     .string({ required_error: "Phone number is required" })
//     .min(10, "Phone number must be at least 10 digits")
//     .regex(/^\d+$/, "Phone number should contain only numbers"),
// });

// const otpSchema = z.object({
//   otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
// });

// const signupSchema = z.object({
//   fullName: z.string().min(2, "Full name must be at least 2 characters"),
//   email: z.string().email("Please enter a valid email address"),
//   termsAccepted: z
//     .boolean()
//     .refine((val) => val === true, "You must accept the terms and conditions"),
// });

// type PhoneFormData = z.infer<typeof phoneSchema>;
// type OtpFormData = z.infer<typeof otpSchema>;
// type SignupFormData = z.infer<typeof signupSchema>;

// type RegistrationStatus = "INITIATED" | "COMPLETED";
// type CurrentStep = "phone" | "otp" | "registration" | "dashboard" | "success";

// const BikeRentalSignup: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState<CurrentStep>("phone");
//   const [isLoading, setIsLoading] = useState(false);
//   const [userPhone, setUserPhone] = useState("");
//   const [registrationStatus, setRegistrationStatus] =
//     useState<RegistrationStatus | null>(null);
//   const [resendTimer, setResendTimer] = useState(0);
//   const [userName, setUserName] = useState("");

//   const phoneForm = useForm<PhoneFormData>({
//     resolver: zodResolver(phoneSchema),
//     defaultValues: {
//       phone: "",
//     },
//   });

//   const otpForm = useForm<OtpFormData>({
//     resolver: zodResolver(otpSchema),
//     defaultValues: {
//       otp: "",
//     },
//   });

//   const signupForm = useForm<SignupFormData>({
//     resolver: zodResolver(signupSchema),
//     defaultValues: {
//       fullName: "",
//       email: "",
//       termsAccepted: false,
//     },
//   });

//   // Simulate OTP sending
//   const sendOTP = async (phone: string) => {
//     console.log(`Sending OTP to ${phone}`);
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     setResendTimer(60);
//     const timer = setInterval(() => {
//       setResendTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handlePhoneSubmit = async (data: PhoneFormData) => {
//     setIsLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       setUserPhone(data.phone);
//       await sendOTP(data.phone);
//       setCurrentStep("otp");
//     } catch (error) {
//       console.error("Phone submission failed:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleOtpSubmit = async (data: OtpFormData) => {
//     setIsLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       if (data.otp === "123456") {
//         // Simulate API call to check registration status
//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         // Simulate random status for demo
//         const isNewUser = Math.random() > 0.5;
//         const status: RegistrationStatus = isNewUser
//           ? "INITIATED"
//           : "COMPLETED";

//         setRegistrationStatus(status);

//         if (status === "COMPLETED") {
//           // Simulate getting user name for existing user
//           setUserName("John Doe");
//           setCurrentStep("dashboard");
//         } else {
//           setCurrentStep("registration");
//         }
//       } else {
//         otpForm.setError("otp", { message: "Invalid OTP. Please try again." });
//       }
//     } catch (error) {
//       console.error("OTP verification failed:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRegistrationSubmit = async (data: SignupFormData) => {
//     setIsLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       setUserName(data.fullName);
//       setCurrentStep("success");
//     } catch (error) {
//       console.error("Registration failed:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     if (resendTimer > 0) return;

//     setIsLoading(true);
//     try {
//       await sendOTP(userPhone);
//       otpForm.setValue("otp", "");
//     } catch (error) {
//       console.error("Resend OTP failed:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderPhoneForm = () => (
//     <div className="space-y-6">
//       <div className="text-center mb-6">
//         <h2 className="text-xl sm:text-2xl font-bold text-black/80 mb-2">
//           Welcome!
//         </h2>
//         <p className="text-sm sm:text-base text-black/60">
//           Enter your phone number to get started
//         </p>
//       </div>

//       <Form {...phoneForm}>
//         <div className="bg-tan-950/20 p-4 sm:p-6 rounded-lg border border-tan-800/30">
//           <FormField
//             control={phoneForm.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-black/80 font-medium text-sm">
//                   Phone Number
//                 </FormLabel>
//                 <FormControl>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <Input
//                       {...field}
//                       type="tel"
//                       placeholder="Enter your phone number"
//                       className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none text-base"
//                     />
//                   </div>
//                 </FormControl>
//                 <FormMessage className="text-red-400" />
//               </FormItem>
//             )}
//           />
//         </div>

//         <Button
//           variant={"gold"}
//           type="submit"
//           disabled={isLoading}
//           onClick={phoneForm.handleSubmit(handlePhoneSubmit)}
//         >
//           {isLoading ? "Sending OTP..." : "Send OTP"}
//         </Button>
//       </Form>
//     </div>
//   );

//   const renderOtpForm = () => (
//     <div className="space-y-6">
//       <div className="text-center mb-6">
//         <h2 className="text-xl sm:text-2xl font-bold text-black/80 mb-2">
//           Verify Phone
//         </h2>
//         <p className="text-sm sm:text-base text-black/60 break-all">
//           Enter the OTP sent to {userPhone}
//         </p>
//       </div>

//       <Form {...otpForm}>
//         <div className="bg-tan-950/20 p-4 sm:p-6 rounded-lg border border-tan-800/30">
//           <p className="text-black/50 text-xs sm:text-sm mb-6 text-center">
//             Please enter the 6-digit code. Use <strong>123456</strong> for demo.
//           </p>

//           <FormField
//             control={otpForm.control}
//             name="otp"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-black/80 font-medium text-sm">
//                   Verification Code
//                 </FormLabel>
//                 <FormControl>
//                   <div className="relative">
//                     <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <Input
//                       {...field}
//                       type="text"
//                       placeholder="000000"
//                       maxLength={6}
//                       className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none text-center text-lg font-mono tracking-widest"
//                     />
//                   </div>
//                 </FormControl>
//                 <FormMessage className="text-red-400" />
//               </FormItem>
//             )}
//           />

//           <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
//             <Button
//               type="button"
//               variant="ghost"
//               onClick={() => setCurrentStep("phone")}
//               className="text-tan-600 hover:text-tan-700 flex items-center gap-1 text-sm"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               Change Phone
//             </Button>
//             <Button
//               type="button"
//               variant="ghost"
//               onClick={handleResendOTP}
//               disabled={resendTimer > 0 || isLoading}
//               className="text-tan-600 hover:text-tan-700 flex items-center gap-1 text-sm"
//             >
//               {resendTimer > 0 ? (
//                 <>
//                   <Clock className="w-4 h-4" />
//                   Resend in {resendTimer}s
//                 </>
//               ) : (
//                 "Resend OTP"
//               )}
//             </Button>
//           </div>
//         </div>

//         <Button
//           type="submit"
//           disabled={isLoading}
//           onClick={otpForm.handleSubmit(handleOtpSubmit)}
//           className="w-full bg-gradient-to-r from-tan-600 to-tan-700 hover:from-tan-700 hover:to-tan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
//         >
//           {isLoading ? "Verifying..." : "Verify OTP"}
//         </Button>
//       </Form>
//     </div>
//   );

//   const renderRegistrationForm = () => (
//     <div className="space-y-6">
//       <div className="text-center mb-6">
//         <h2 className="text-xl sm:text-2xl font-bold text-black/80 mb-2">
//           Complete Profile
//         </h2>
//         <p className="text-sm sm:text-base text-black/60">
//           Just a few more details to get started
//         </p>
//       </div>

//       <Form {...signupForm}>
//         <div className="bg-tan-950/20 p-4 sm:p-6 rounded-lg border border-tan-800/30 space-y-4">
//           <FormField
//             control={signupForm.control}
//             name="fullName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-black/80 font-medium text-sm">
//                   Full Name
//                 </FormLabel>
//                 <FormControl>
//                   <div className="relative">
//                     <User2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <Input
//                       {...field}
//                       type="text"
//                       placeholder="Enter your full name"
//                       className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none"
//                     />
//                   </div>
//                 </FormControl>
//                 <FormMessage className="text-red-400" />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={signupForm.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-black/80 font-medium text-sm">
//                   Email Address
//                 </FormLabel>
//                 <FormControl>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <Input
//                       {...field}
//                       type="email"
//                       placeholder="Enter your email address"
//                       className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none"
//                     />
//                   </div>
//                 </FormControl>
//                 <FormMessage className="text-red-400" />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={signupForm.control}
//             name="termsAccepted"
//             render={({ field }) => (
//               <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//                 <FormControl>
//                   <Checkbox
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                     className="border-tan-800 data-[state=checked]:bg-tan-400 data-[state=checked]:border-tan-400 mt-1"
//                   />
//                 </FormControl>
//                 <div className="space-y-1 leading-none">
//                   <FormLabel className="text-sm font-medium text-black/80">
//                     I accept the terms and conditions *
//                   </FormLabel>
//                   <FormDescription className="text-black/60 text-xs">
//                     You agree to our Terms of Service and Privacy Policy
//                   </FormDescription>
//                 </div>
//                 <FormMessage className="text-red-400" />
//               </FormItem>
//             )}
//           />
//         </div>

//         <Button
//           type="submit"
//           disabled={isLoading}
//           onClick={signupForm.handleSubmit(handleRegistrationSubmit)}
//           className="w-full bg-gradient-to-r from-tan-600 to-tan-700 hover:from-tan-700 hover:to-tan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
//         >
//           {isLoading ? "Creating Account..." : "Complete Registration"}
//         </Button>
//       </Form>
//     </div>
//   );

//   const renderDashboard = () => (
//     <div className="space-y-6">
//       <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200 text-center">
//         <UserCheck className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 mx-auto mb-4" />
//         <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">
//           Welcome back, {userName}!
//         </h3>
//         <p className="text-sm sm:text-base text-blue-700 mb-4">
//           Your account is verified and ready to use. You can start renting bikes
//           right away.
//         </p>
//         <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
//           Go to Dashboard
//         </Button>
//       </div>
//     </div>
//   );

//   const renderSuccessScreen = () => (
//     <div className="space-y-6">
//       <div className="bg-green-50 p-4 sm:p-6 rounded-lg border border-green-200 text-center">
//         <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-600 mx-auto mb-4" />
//         <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">
//           Account Created Successfully!
//         </h3>
//         <p className="text-sm sm:text-base text-green-700 mb-4">
//           Welcome to BikeRental Pro, {userName}! Your account has been created
//           and you're ready to start renting bikes.
//         </p>
//         <Button
//           onClick={() => {
//             // Reset everything and go to dashboard simulation
//             setCurrentStep("dashboard");
//           }}
//           className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
//         >
//           Continue to Dashboard
//         </Button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen  bg-gradient-to-br from-[#141414] via-gray-800 to-[#141414] flex items-center justify-center p-4">
//       <Card className="w-full max-w-md border-0 shadow-sm sm:max-w-lg md:max-w-xl lg:max-w-xl bg-white lg:border-tan-500 backdrop-blur-sm">
//         <CardHeader className="text-center pb-6 px-4 sm:px-6">
//           <div className="flex items-center justify-center gap-2 mb-4">
//             <Bike className="h-6 w-6 sm:h-8 sm:w-8 text-black/80" />
//             <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-black/80">
//               BikeRental Pro
//             </CardTitle>
//           </div>
//           <CardDescription className="text-sm sm:text-base md:text-lg text-black/60">
//             {currentStep === "phone" &&
//               "Enter your phone number to get started with BikeRental Pro"}
//             {currentStep === "otp" &&
//               "Verify your phone number with the OTP we sent"}
//             {currentStep === "registration" &&
//               "Complete your profile to start renting bikes"}
//             {currentStep === "dashboard" &&
//               "Your account is ready - start your cycling adventure!"}
//             {currentStep === "success" &&
//               "Welcome to the BikeRental Pro community!"}
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="px-4 sm:px-6">
//           {currentStep === "phone" && renderPhoneForm()}
//           {currentStep === "otp" && renderOtpForm()}
//           {currentStep === "registration" && renderRegistrationForm()}
//           {currentStep === "dashboard" && renderDashboard()}
//           {currentStep === "success" && renderSuccessScreen()}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default BikeRentalSignup;

// app/(auth)/sign-up/page.tsx

// import SignUpForm from "@/components/auth/SignUpForm";

// export default function UserSignUpPage() {
//   return <SignUpForm />;
// }


"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Bike,
  Mail,
  Phone,
  User2,
  Shield,
  CheckCircle,
  ArrowLeft,
  Clock,
  UserCheck,
} from "lucide-react";
import { useAppContext } from "@/hooks/context";
import { saveToLocalStorage } from "@/components/ui/encryption";
import { apiHeader } from "../../../hooks/useHeader";
import { useLogOut } from "@/hooks/useLogout";
import { useRouter } from "next/navigation";

// Define the form schemas with Zod
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number should contain only numbers"),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
});

type EmailFormData = z.infer<typeof emailSchema>;
type OtpFormData = z.infer<typeof otpSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

type RegistrationStatus = "active" | "inactive";
type CurrentStep = "email" | "otp" | "registration" | "dashboard" | "success";

interface VerifyResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      email: string;
      userId: string;
      role: string;
      status: string;
      mobile: string;
    };
  };
}

const BikeRentalSignup: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>();
  const header = apiHeader();
  const logOut = useLogOut();
  const [currentStep, setCurrentStep] = useState<CurrentStep>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [userName, setUserName] = useState("");

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      termsAccepted: false,
    },
  });

  const API_BASE_URL =
    process.env.PUBLIC_NEXT_SERVER_URL || "http://localhost:8000/api";

  // Send OTP to email
  const sendOTP = async (email: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send OTP");
      }

      setResendTimer(60);
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return result;
    } catch (error) {
      console.error("Send OTP error:", error);
      throw error;
    }
  };

  const handleEmailSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    try {
      await sendOTP(data.email);
      setUserEmail(data.email);
      setCurrentStep("otp");
    } catch (error) {
      console.error("Email submission failed:", error);
      emailForm.setError("email", {
        message: "Failed to send OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (data: OtpFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          otp: data.otp,
        }),
      });

      const result: VerifyResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "OTP verification failed");
      }
      console.log("result.data", result.data);
      if (response.status == 200) {
        setUserData(result.data.user);
        saveToLocalStorage("token", result.data.token);
        saveToLocalStorage("userId", result.data.user.userId);
        saveToLocalStorage("role", result.data.user.role);
        saveToLocalStorage("status", result.data.user.status);
        saveToLocalStorage("email", result.data.user.email);
        if (result.data.user.status === "inactive") {
          setCurrentStep("registration");
        } else {
          setUserName(result.data.user.email.split("@")[0]); // Use email prefix as name if active
          setCurrentStep("dashboard");
        }
      } else if (response.status == 401 || response.status === 403) {
        otpForm.setError("otp", {
          message: result.message || "Invalid OTP. Please try again.",
        });
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      otpForm.setError("otp", { message: "Invalid OTP. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistrationSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      // Here you would typically call an update profile API
      // For now, we'll simulate it
      if (!header) {
        logOut();
        return;
      }
      const response = await fetch(`${API_BASE_URL}/user/update-initial-data`, {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          name: data.fullName,
          phone: data.phone,
        }),
      });

      const resData = await response.json();
      if (response.status == 200) {
        setUserName(resData.fullName);
        setCurrentStep("success");
      } else if (response.status == 401 || response.status === 403) {
        console.log("bad request");
      }

      setUserName(data.fullName);
      setCurrentStep("success");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setIsLoading(true);
    try {
      await sendOTP(userEmail);
      otpForm.setValue("otp", "");
    } catch (error) {
      console.error("Resend OTP failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderEmailForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-black/80 mb-2">
          Welcome!
        </h2>
        <p className="text-sm sm:text-base text-black/60">
          Enter your email address to get started
        </p>
      </div>

      <Form {...emailForm}>
        <div className="bg-tan-950/20 p-4 sm:p-6 rounded-lg border border-tan-800/30">
          <FormField
            control={emailForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black/80 font-medium text-sm">
                  Email Address
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email address"
                      className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none text-base"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          onClick={emailForm.handleSubmit(handleEmailSubmit)}
          className="w-full bg-gradient-to-r from-tan-600 to-tan-700 hover:from-tan-700 hover:to-tan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </Button>
      </Form>
    </div>
  );

  const renderOtpForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-black/80 mb-2">
          Verify Email
        </h2>
        <p className="text-sm sm:text-base text-black/60 break-all">
          Enter the OTP sent to {userEmail}
        </p>
      </div>

      <Form {...otpForm}>
        <div className="bg-tan-950/20 p-4 sm:p-6 rounded-lg border border-tan-800/30">
          <p className="text-black/50 text-xs sm:text-sm mb-6 text-center">
            Please enter the 6-digit code sent to your email.
          </p>

          <FormField
            control={otpForm.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black/80 font-medium text-sm">
                  Verification Code
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      {...field}
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none text-center text-lg font-mono tracking-widest"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setCurrentStep("email")}
              className="text-tan-600 hover:text-tan-700 flex items-center gap-1 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Change Email
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleResendOTP}
              disabled={resendTimer > 0 || isLoading}
              className="text-tan-600 hover:text-tan-700 flex items-center gap-1 text-sm"
            >
              {resendTimer > 0 ? (
                <>
                  <Clock className="w-4 h-4" />
                  Resend in {resendTimer}s
                </>
              ) : (
                "Resend OTP"
              )}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          onClick={otpForm.handleSubmit(handleOtpSubmit)}
          className="w-full bg-gradient-to-r from-tan-600 to-tan-700 hover:from-tan-700 hover:to-tan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>
      </Form>
    </div>
  );

  const renderRegistrationForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-black/80 mb-2">
          Complete Profile
        </h2>
        <p className="text-sm sm:text-base text-black/60">
          Just a few more details to get started
        </p>
      </div>

      <Form {...signupForm}>
        <div className="bg-tan-950/20 p-4 sm:p-6 rounded-lg border border-tan-800/30 space-y-4">
          <FormField
            control={signupForm.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black/80 font-medium text-sm">
                  Full Name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={signupForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black/80 font-medium text-sm">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={signupForm.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-tan-800 data-[state=checked]:bg-tan-400 data-[state=checked]:border-tan-400 mt-1"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-medium text-black/80">
                    I accept the terms and conditions *
                  </FormLabel>
                  <FormDescription className="text-black/60 text-xs">
                    You agree to our Terms of Service and Privacy Policy
                  </FormDescription>
                </div>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          onClick={signupForm.handleSubmit(handleRegistrationSubmit)}
          className="w-full bg-gradient-to-r from-tan-600 to-tan-700 hover:from-tan-700 hover:to-tan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
        >
          {isLoading ? "Creating Account..." : "Complete Registration"}
        </Button>
      </Form>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200 text-center">
        <UserCheck className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">
          Welcome back, {userName}!
        </h3>
        <p className="text-sm sm:text-base text-blue-700 mb-4">
          Your account is verified and ready to use. You can start renting bikes
          right away.
        </p>
        <Button 
          onClick={() => router.push("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
          Go to Dashboard
        </Button>
      </div>
    </div>
  );

  const renderSuccessScreen = () => (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 sm:p-6 rounded-lg border border-green-200 text-center">
        <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">
          Account Updated Successfully!
        </h3>
        <p className="text-sm sm:text-base text-green-700 mb-4">
          Welcome to BikeRental Pro, {userName}! Your profile has been completed
          and you're ready to start renting bikes.
        </p>
        <Button
          onClick={() => {
            // Reset everything and go to dashboard simulation
            setCurrentStep("dashboard");
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
        >
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  bg-gradient-to-br from-[#141414] via-gray-800 to-[#141414] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-sm sm:max-w-lg md:max-w-xl lg:max-w-xl bg-white lg:border-tan-500 backdrop-blur-sm">
        <CardHeader className="text-center pb-6 px-4 sm:px-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bike className="h-6 w-6 sm:h-8 sm:w-8 text-black/80" />
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-black/80">
              BikeRental Pro
            </CardTitle>
          </div>
          <CardDescription className="text-sm sm:text-base md:text-lg text-black/60">
            {currentStep === "email" &&
              "Enter your email address to get started with BikeRental Pro"}
            {currentStep === "otp" && "Verify your email with the OTP we sent"}
            {currentStep === "registration" &&
              "Complete your profile to start renting bikes"}
            {currentStep === "dashboard" &&
              "Your account is ready - start your cycling adventure!"}
            {currentStep === "success" &&
              "Welcome to the BikeRental Pro community!"}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
          {currentStep === "email" && renderEmailForm()}
          {currentStep === "otp" && renderOtpForm()}
          {currentStep === "registration" && renderRegistrationForm()}
          {currentStep === "dashboard" && renderDashboard()}
          {currentStep === "success" && renderSuccessScreen()}
        </CardContent>
      </Card>
    </div>
  );
};

export default BikeRentalSignup;
