import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  AlertCircle,
  Info,
  Check,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Status and error states
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load remembered email on mount (if user previously checked Remember Me)
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("studypath_remembered_email");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch {
      // Storage access gracefully handled
    }
  }, []);

  const validate = () => {
    const errors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      errors.email = "Please enter your email address.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        errors.email =
          "Please enter a valid email address (e.g., student@example.com).";
      }
    }

    if (!password) {
      errors.password = "Please enter your password.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Manage Remember Me preference (email only - never store passwords in storage!)
      if (rememberMe) {
        localStorage.setItem("studypath_remembered_email", email.trim());
      } else {
        localStorage.removeItem("studypath_remembered_email");
      }
    } catch {
      // Safe fallback
    }

    // Determine student display name from email or default demo name
    const emailPrefix = email.split("@")[0] || "Student";
    const formattedName = emailPrefix
      .replace(/[._]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    // Complete frontend demonstration login (safe, no plain-text passwords stored)
    loginUser(formattedName, email.trim());
    const destination = location.state?.from?.pathname || "/recommendations";
    navigate(destination, { replace: true });
  };

  // Quick 1-click student demo sign-in for evaluator convenience
  const handleDemoSignIn = () => {
    setEmail("aarav.sharma@example.com");
    setPassword("DemoPass2026!");
    setErrorMessage("");
    setFieldErrors({});
    loginUser("Aarav Sharma", "aarav.sharma@example.com");
    const destination = location.state?.from?.pathname || "/recommendations";
    navigate(destination, { replace: true });
  };

  const loggedOutMessage = location.state?.loggedOut
    ? location.state?.message || "You have logged out successfully."
    : null;
  const isProtectedRedirect = location.state?.reason === "protected";

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
          Welcome Back
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          Continue planning your study abroad journey.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-[#1B231F] py-8 px-6 sm:px-8 rounded-xl border border-[#E5E7EB] dark:border-[#2D3A32] shadow-sm space-y-6">
          {/* Logout Success Banner */}
          {loggedOutMessage && (
            <div className="p-3.5 rounded-lg bg-[#E5EEE7] dark:bg-[#222D26] border border-[#276749]/30 text-xs text-[#276749] dark:text-[#84CCA0] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="font-semibold">{loggedOutMessage}</span>
            </div>
          )}

          {/* Protected Route Redirect Message */}
          {isProtectedRedirect && !loggedOutMessage && (
            <div className="p-3.5 rounded-lg bg-[#E5EEE7] dark:bg-[#222D26] border border-[#d2e2d5] dark:border-[#2f3f35] text-xs text-[#252A27] dark:text-[#F1F3F1] flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 text-[#276749] dark:text-[#84CCA0]" />
              <span>
                Please log in to access your student profile and application
                plan.
              </span>
            </div>
          )}

          {/* Transparent Frontend Demo Notice */}
          <div className="p-3.5 rounded-lg bg-[#E5EEE7] dark:bg-[#222D26] border border-[#d2e2d5] dark:border-[#2f3f35] text-xs text-[#252A27] dark:text-[#D1D5DB] space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#276749] dark:text-[#84CCA0]">
              <Info className="w-4 h-4 shrink-0" />
              <span>Frontend Demonstration Mode</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
              Authentication is simulated locally in this preview. Passwords are
              never stored in localStorage or transmitted.
            </p>
            <button
              type="button"
              onClick={handleDemoSignIn}
              className="mt-1 w-full py-1.5 px-3 rounded-md bg-white dark:bg-[#1B231F] border border-[#E5E7EB] dark:border-[#2D3A32] text-xs font-semibold text-[#276749] dark:text-[#84CCA0] hover:bg-[#FAF9F6] dark:hover:bg-[#141A16] transition-colors cursor-pointer"
            >
              One-Click Demo Student Sign-In
            </button>
          </div>

          {/* Top Error Alert if any */}
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Forgot Password Notification Message */}
          {forgotPasswordMessage && (
            <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <div className="font-semibold flex items-center justify-between">
                <span>Password Recovery Notice</span>
                <button
                  type="button"
                  onClick={() => setForgotPasswordMessage(false)}
                  className="text-amber-700 dark:text-amber-300 font-bold hover:underline cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
              <p className="text-[11px] leading-relaxed">
                Password recovery is not implemented in this demo mode. You can
                log in using any test credentials or create a new student
                account on the Register page.
              </p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} noValidate className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-[#252A27] dark:text-[#F1F3F1] mb-1.5"
              >
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) {
                    setFieldErrors((prev) => ({ ...prev, email: null }));
                  }
                }}
                placeholder="student@example.com"
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
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold text-[#252A27] dark:text-[#F1F3F1]"
                >
                  Password
                </label>
                {/* Forgot Password Link */}
                <button
                  type="button"
                  onClick={() => setForgotPasswordMessage(true)}
                  className="text-xs font-medium text-[#276749] dark:text-[#84CCA0] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) {
                      setFieldErrors((prev) => ({ ...prev, password: null }));
                    }
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`w-full px-3.5 py-2.5 pr-11 rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border text-sm text-[#252A27] dark:text-[#F1F3F1] placeholder-[#9CA3AF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#276749] ${
                    fieldErrors.password
                      ? "border-red-500 dark:border-red-500"
                      : "border-[#E5E7EB] dark:border-[#2D3A32]"
                  }`}
                />
                {/* Show/Hide Password Button */}
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

            {/* Remember Me Checkbox */}
            <div className="flex items-center pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#E5E7EB] dark:border-[#2D3A32] text-[#276749] focus:ring-[#276749] cursor-pointer accent-[#276749]"
                />
                <span className="text-xs text-[#252A27] dark:text-[#D1D5DB]">
                  Remember me
                </span>
              </label>
            </div>

            {/* Green "Login" Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-lg bg-[#276749] hover:bg-[#1F523A] text-white font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50 mt-2"
            >
              {isSubmitting ? "Signing in..." : "Login"}
            </button>
          </form>

          {/* Link: "Don't have an account? Register" */}
          <div className="pt-4 border-t border-[#E5E7EB] dark:border-[#2D3A32] text-center">
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-[#276749] dark:text-[#84CCA0] hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
