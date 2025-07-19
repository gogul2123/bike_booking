"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User, Phone, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Motorcycle icon component
const MotorcycleIcon = () => (
  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm14.5 3c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM12 4.5c0-1.11-.89-2-2-2s-2 .89-2 2 .89 2 2 2 2-.89 2-2zM21 14h-3.5l-1.19-3.83C16.07 9.47 15.38 9 14.58 9H12.5c-.37 0-.72.1-1.03.26l-1.88.94c-.39.2-.59.63-.59 1.08 0 .83.94 1.28 1.56.72L12 10.5h2l1.5 4.84c.04.17.01.34-.08.49-.13.22-.35.17-.35.17H9.5C8.57 16 8 16.58 8 17.5S8.57 19 9.5 19H21c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1z"/>
  </svg>
);

// Password strength indicator
const PasswordStrength = ({ password }: { password: string }) => {
  const getPasswordStrength = (password: string) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    Object.values(checks).forEach(check => {
      if (check) score++;
    });

    return { score, checks };
  };

  const { score, checks } = getPasswordStrength(password);
  
  const getStrengthText = () => {
    if (score < 2) return { text: "Weak", color: "text-red-500" };
    if (score < 4) return { text: "Fair", color: "text-yellow-500" };
    if (score < 5) return { text: "Good", color: "text-blue-500" };
    return { text: "Strong", color: "text-green-500" };
  };

  const strength = getStrengthText();

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-1 w-4 rounded-full transition-colors ${
                level <= score
                  ? score < 2
                    ? "bg-red-500"
                    : score < 4
                    ? "bg-yellow-500"
                    : score < 5
                    ? "bg-blue-500"
                    : "bg-green-500"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <span className={`text-xs font-medium ${strength.color}`}>
          {strength.text}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1 text-xs">
        <div className={`flex items-center gap-1 ${checks.length ? "text-green-600" : "text-gray-400"}`}>
          {checks.length ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
          8+ characters
        </div>
        <div className={`flex items-center gap-1 ${checks.uppercase ? "text-green-600" : "text-gray-400"}`}>
          {checks.uppercase ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
          Uppercase
        </div>
        <div className={`flex items-center gap-1 ${checks.lowercase ? "text-green-600" : "text-gray-400"}`}>
          {checks.lowercase ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
          Lowercase
        </div>
        <div className={`flex items-center gap-1 ${checks.number ? "text-green-600" : "text-gray-400"}`}>
          {checks.number ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
          Number
        </div>
      </div>
    </div>
  );
};

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  type Errors = {
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  };
  const [errors, setErrors] = useState<Errors>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      acceptTerms
    );
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleTermsChange = (checked: boolean) => {
    setAcceptTerms(checked);
    if (errors.terms) {
      setErrors(prev => ({ ...prev, terms: undefined }));
    }
  };

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newErrors: Errors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters with uppercase, lowercase, and number";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Sign up data:", { ...formData, acceptTerms });
        // Add your sign up logic here
      } catch (error) {
        console.error("Sign up error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg border shadow-lg p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            {/* <div className="flex justify-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-xl shadow-sm">
                <MotorcycleIcon />
              </div>
            </div> */}
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Create your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Join BikeRent and start your journey
              </p>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className="space-y-4">
            <div className="space-y-4">
              {/* Full Name Field */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`pl-10 ${errors.fullName ? 'border-red-300 focus-visible:ring-red-500' : ''}`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-red-300 focus-visible:ring-red-500' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`pl-10 ${errors.phone ? 'border-red-300 focus-visible:ring-red-500' : ''}`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
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
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
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
                <PasswordStrength password={formData.password} />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-300 focus-visible:ring-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => handleTermsChange(e.target.checked)}
                    className="w-4 h-4 text-[#AC9456] border-gray-300 rounded focus:ring-[#AC9456] focus:ring-2"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                    I agree to the{" "}
                    <button
                      type="button"
                      className="font-medium text-[#AC9456] hover:text-[#9B8449] transition-colors underline"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="font-medium text-[#AC9456] hover:text-[#9B8449] transition-colors underline"
                    >
                      Privacy Policy
                    </button>
                  </Label>
                </div>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-500">{errors.terms}</p>
              )}
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              onClick={handleSignUp}
              disabled={isLoading || !isFormValid()}
              className={`w-full px-6 py-5 font-bold text-white shadow-lg transition-all duration-300 ${
                isFormValid() && !isLoading
                  ? 'bg-gradient-to-r from-[#AC9456] to-[#9B8449] hover:from-[#9B8449] hover:to-[#AC9456] hover:shadow-xl transform hover:scale-[1.02]'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                className="font-medium text-[#AC9456] hover:text-[#9B8449] transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}