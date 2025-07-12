"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  User,
  Mail,
  Phone,
  User2,
  Shield,
  CheckCircle,
} from "lucide-react";

// Define the form schemas with Zod
const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number should contain only numbers"),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
});

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

// Define the form fields array
type SignupFieldName = "fullName" | "email" | "phone";

type FormFieldConfig = {
  label: string;
  name: SignupFieldName;
  type: string;
  placeholder: string;
  icon: React.ElementType;
};

const formFields: FormFieldConfig[] = [
  {
    label: "Full Name",
    name: "fullName",
    type: "text",
    placeholder: "Enter your full name",
    icon: User2,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter your email address",
    icon: Mail,
  },
  {
    label: "Phone",
    name: "phone",
    type: "tel",
    placeholder: "Enter your phone number",
    icon: Phone,
  },
];

type SignupFormData = z.infer<typeof signupSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

const BikeRentalSignup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<"signup" | "otp" | "success">(
    "signup"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      termsAccepted: false,
    },
  });

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Simulate OTP sending
  const sendOTP = async (email: string) => {
    // In real app, this would call your API to send OTP
    console.log(`Sending OTP to ${email}`);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Start resend timer
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
  };

  const handleSignupSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call for signup
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Store email for OTP verification
      setUserEmail(data.email);

      // Send OTP
      await sendOTP(data.email);

      // Move to OTP step
      setCurrentStep("otp");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (data: OtpFormData) => {
    setIsLoading(true);
    try {
      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In real app, verify OTP with backend
      if (data.otp === "123456") {
        setCurrentStep("success");
      } else {
        otpForm.setError("otp", { message: "Invalid OTP. Please try again." });
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
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

  const renderSignupForm = () => (
    <Form {...signupForm}>
      <div className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-tan-950/20 p-6 rounded-lg border border-tan-800/30">
          <h3 className="text-xl font-semibold text-black/60 mb-4 flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {formFields.slice(0, 5).map((field) => (
              <FormField
                key={field.name}
                control={signupForm.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel className="text-black/80 font-medium text-sm">
                      {field.label}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          {...formField}
                          value={
                            typeof formField.value === "string" ||
                            typeof formField.value === "number" ||
                            formField.value === undefined
                              ? formField.value ?? ""
                              : ""
                          }
                          type={field.type}
                          placeholder={field.placeholder}
                          className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            ))}
            <FormField
              control={signupForm.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-tan-800 data-[state=checked]:bg-tan-400 data-[state=checked]:border-tan-400"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium text-black/80">
                      I accept the terms and conditions *
                    </FormLabel>
                    <FormDescription className="text-black/60">
                      You agree to our Terms of Service and Privacy Policy
                    </FormDescription>
                  </div>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          onClick={signupForm.handleSubmit(handleSignupSubmit)}
          className="w-full bg-gradient-to-r from-tan-600 to-tan-700 hover:from-tan-700 hover:to-tan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </div>
    </Form>
  );

  const renderOtpForm = () => (
    <Form {...otpForm}>
      <div className="space-y-6">
        <div className="bg-tan-950/20 p-6 rounded-lg border border-tan-800/30">
          <h3 className="text-xl font-semibold text-black/60 mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Verify Your Email
          </h3>
          <p className="text-black/60 mb-4">
            We've sent a 6-digit verification code to{" "}
            <strong>{userEmail}</strong>
          </p>
          <p className="text-black/50 text-sm mb-6">
            Please enter the code to complete your registration. Use{" "}
            <strong>123456</strong> for demo.
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
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tan-500 transition-colors outline-none text-center text-lg font-mono tracking-widest"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center mt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setCurrentStep("signup")}
              className="text-tan-600 hover:text-tan-700"
            >
              ← Back to Signup
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleResendOTP}
              disabled={resendTimer > 0 || isLoading}
              className="text-tan-600 hover:text-tan-700"
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          onClick={otpForm.handleSubmit(handleOtpSubmit)}
          className="w-full bg-gradient-to-r from-tan-600 to-tan-700 hover:from-tan-700 hover:to-tan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          {isLoading ? "Verifying..." : "Verify & Complete Registration"}
        </Button>
      </div>
    </Form>
  );

  const renderSuccessScreen = () => (
    <div className="space-y-6">
      <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Account Created Successfully!
        </h3>
        <p className="text-green-700 mb-4">
          Welcome to BikeRental Pro! Your account has been verified and you're
          ready to start renting bikes.
        </p>
        <Button
          onClick={() => {
            // Reset forms and go back to signup (or redirect to login/dashboard)
            setCurrentStep("signup");
            signupForm.reset();
            otpForm.reset();
            setUserEmail("");
          }}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141414] via-gray-800 to-[#141414] flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white border-tan-500 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bike className="h-8 w-8 text-black/80" />
            <CardTitle className="text-3xl font-bold text-black/80">
              BikeRental Pro
            </CardTitle>
          </div>
          <CardDescription className="text-black/60 text-lg">
            {currentStep === "signup" &&
              "Join thousands of riders and start your cycling adventure today"}
            {currentStep === "otp" &&
              "Verify your email to complete registration"}
            {currentStep === "success" && "Welcome to BikeRental Pro!"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {currentStep === "signup" && renderSignupForm()}
          {currentStep === "otp" && renderOtpForm()}
          {currentStep === "success" && renderSuccessScreen()}
        </CardContent>
      </Card>
    </div>
  );
};

export default BikeRentalSignup;
