import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error and UI state
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errors = {};
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    // Full Name Validation
    if (!trimmedName) {
      errors.fullName = "Full name is required.";
    } else if (trimmedName.length < 2) {
      errors.fullName = "Full name must be at least 2 characters.";
    }

    // Email Validation
    if (!trimmedEmail) {
      errors.email = "Email address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        errors.email =
          "Please enter a valid email address (e.g. name@example.com).";
      }
    }

    // Password Validation
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    // Confirm Password Validation
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        name: fullName.trim(),
        email: email.trim(),
        password,
      });

      // Registration succeeded. Redirect to Login.
      navigate("/login", { replace: true });
    } catch (error) {
      setGeneralError(
        error.message || "Registration failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF9F6] dark:bg-[#141A16] text-[#252A27] dark:text-[#F1F3F1] flex flex-col justify-center py-12 px-4 sm:px-6 transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        {/* StudyPath AI text logo */}
        <Link
          to="/"
          className="inline-block text-2xl font-extrabold tracking-tight text-[#252A27] dark:text-[#F1F3F1] hover:text-[#276749] dark:hover:text-[#84CCA0] transition-colors mb-1"
        >
          StudyPath{" "}
          <span className="text-[#276749] dark:text-[#84CCA0]">AI</span>
        </Link>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#252A27] dark:text-[#F1F3F1]">
          Create Your Account
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          Start your study abroad journey today.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-[#1B231F] py-8 px-6 sm:px-8 rounded-xl border border-[#E5E7EB] dark:border-[#2D3A32] shadow-sm space-y-6">
          {/* General Error Alert */}
          {generalError && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{generalError}</span>
            </div>
          )}

          {/* Registration Form */}
          <form
            onSubmit={handleRegister}
            noValidate
            className="space-y-4 text-xs sm:text-sm"
          >
            {/* Full Name Field */}
            <div>
              <label
                htmlFor="register-fullname"
                className="block text-xs font-semibold text-[#252A27] dark:text-[#F1F3F1] mb-1.5"
              >
                Full Name
              </label>
              <input
                id="register-fullname"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (fieldErrors.fullName) {
                    setFieldErrors((prev) => ({ ...prev, fullName: null }));
                  }
                }}
                placeholder="e.g. Aarav Sharma"
                autoComplete="name"
                className={`w-full px-3.5 py-2.5 rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border text-sm text-[#252A27] dark:text-[#F1F3F1] placeholder-[#9CA3AF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#276749] ${
                  fieldErrors.fullName
                    ? "border-red-500 dark:border-red-500"
                    : "border-[#E5E7EB] dark:border-[#2D3A32]"
                }`}
              />
              {fieldErrors.fullName && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {fieldErrors.fullName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="register-email"
                className="block text-xs font-semibold text-[#252A27] dark:text-[#F1F3F1] mb-1.5"
              >
                Email Address
              </label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) {
                    setFieldErrors((prev) => ({ ...prev, email: null }));
                  }
                }}
                placeholder="e.g. student@example.com"
                autoComplete="email"
                className={`w-full px-3.5 py-2.5 rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border text-sm text-[#252A27] dark:text-[#F1F3F1] placeholder-[#9CA3AF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#276749] ${
                  fieldErrors.email
                    ? "border-red-500 dark:border-red-500"
                    : "border-[#E5E7EB] dark:border-[#2D3A32]"
                }`}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="register-password"
                className="block text-xs font-semibold text-[#252A27] dark:text-[#F1F3F1] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) {
                      setFieldErrors((prev) => ({ ...prev, password: null }));
                    }
                  }}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  className={`w-full px-3.5 py-2.5 pr-11 rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border text-sm text-[#252A27] dark:text-[#F1F3F1] placeholder-[#9CA3AF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#276749] ${
                    fieldErrors.password
                      ? "border-red-500 dark:border-red-500"
                      : "border-[#E5E7EB] dark:border-[#2D3A32]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#252A27] dark:hover:text-[#F1F3F1] cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="register-confirm-password"
                className="block text-xs font-semibold text-[#252A27] dark:text-[#F1F3F1] mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (fieldErrors.confirmPassword) {
                      setFieldErrors((prev) => ({
                        ...prev,
                        confirmPassword: null,
                      }));
                    }
                  }}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className={`w-full px-3.5 py-2.5 pr-11 rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border text-sm text-[#252A27] dark:text-[#F1F3F1] placeholder-[#9CA3AF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#276749] ${
                    fieldErrors.confirmPassword
                      ? "border-red-500 dark:border-red-500"
                      : "border-[#E5E7EB] dark:border-[#2D3A32]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  title={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#252A27] dark:hover:text-[#F1F3F1] cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Password Match Confirmation Indicator if both filled */}
            {password && confirmPassword && password === confirmPassword && (
              <div className="flex items-center gap-1.5 text-xs text-[#276749] dark:text-[#84CCA0] font-medium pt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Passwords match</span>
              </div>
            )}

            {/* Green "Create Account" Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-lg bg-[#276749] hover:bg-[#1F523A] text-white font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50 mt-2"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Link: "Already have an account? Login" */}
          <div className="pt-4 border-t border-[#E5E7EB] dark:border-[#2D3A32] text-center">
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#276749] dark:text-[#84CCA0] hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
