// src/components/LoginForm.jsx
import React, { useEffect, useRef, useState } from "react";
import bg from "../assets/bg.jpg";
import googleIcon from "../assets/google.png";
import microsoftIcon from "../assets/microsoft.png";
import appleIcon from "../assets/apple.png";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // per-field error state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  // refs for auto-focus on first invalid field
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("login:remember");
      if (saved) {
        const data = JSON.parse(saved);
        if (data?.email) {
          setEmail(data.email);
          setRemember(true);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (remember && email) localStorage.setItem("login:remember", JSON.stringify({ email }));
      else localStorage.removeItem("login:remember");
    } catch {}
  }, [remember, email]);

  // helper validators
  const isValidEmail = (val) => /^\S+@\S+\.\S+$/.test(val);

  // validate only sets per-field errors (returns true if ok)
  const validateFields = () => {
    let ok = true;
    // reset previous errors
    setEmailError("");
    setPasswordError("");
    setFormError("");

    if (!email) {
      setEmailError("Email is required");
      ok = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Enter a valid email id");
      ok = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      ok = false;
    }

    // focus first invalid field
    if (!ok) {
      if (emailError || !email || (email && !isValidEmail(email))) {
        // focus email (use timeout to ensure DOM updated)
        setTimeout(() => emailRef.current?.focus(), 0);
      } else if (passwordError || !password) {
        setTimeout(() => passwordRef.current?.focus(), 0);
      }
    }

    return ok;
  };

  // Simulated auth function:
  // - successful only when email === 'demo@demo.com' && password === 'password123'
  // - if email is correct but password wrong => password error
  // - if email not found => email error
  const fakeAuth = async (emailValue, passwordValue) => {
    await new Promise((r) => setTimeout(r, 700));
    const correctEmail = "demo@demo.com";
    const correctPassword = "password123";
    if (emailValue !== correctEmail) {
      return { success: false, field: "email", message: "No account found with this email" };
    }
    if (passwordValue !== correctPassword) {
      return { success: false, field: "password", message: "Wrong password" };
    }
    return { success: true };
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setFormError("");
    // run basic client validation first
    const basicOk = validateFields();
    if (!basicOk) return;

    setLoading(true);
    try {
      const res = await fakeAuth(email.trim(), password);
      if (!res.success) {
        if (res.field === "email") {
          setEmailError(res.message);
          setTimeout(() => emailRef.current?.focus(), 0);
        } else if (res.field === "password") {
          setPasswordError(res.message);
          setTimeout(() => passwordRef.current?.focus(), 0);
        } else {
          setFormError(res.message || "Login failed");
        }
        return;
      }

      // success - clear sensitive fields and errors
      setPassword("");
      setEmailError("");
      setPasswordError("");
      setFormError("");
      console.log("logged in", { email, remember });
      // TODO: redirect or update auth state
    } catch (err) {
      setFormError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  // instant email validation on blur
  const handleEmailBlur = () => {
    if (!email) setEmailError("Email is required");
    else if (!isValidEmail(email)) setEmailError("Enter a valid email id");
    else setEmailError("");
  };

  // clear field errors on change
  const handleEmailChange = (v) => {
    setEmail(v);
    if (emailError) setEmailError("");
  };
  const handlePasswordChange = (v) => {
    setPassword(v);
    if (passwordError) setPasswordError("");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-end bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <main className="relative z-10 w-full max-w-3xl mx-6">
        <section
          className="bg-white rounded-[20px] shadow-2xl p-8 sm:p-10 w-full max-w-[640px] ml-auto"
          style={{ borderRadius: 20 }}
        >
          {/* Header */}
          <div className="mb-6">
            <h1 className="font-lexend text-[28px] font-semibold text-[#1D1D1D]">Welcome Back</h1>
            <p className="text-sm text-[#999999] font-lexend">Log in to continue</p>
          </div>

          {/* social buttons */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-3 gap-3 mb-6">
            <button
              type="button"
              onClick={() => alert("Google OAuth")}
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-[23px] py-2 w-full md:w-[199px] h-[32px] bg-white hover:bg-gray-50 transition"
              aria-label="Continue with Google"
            >
              <img src={googleIcon} alt="Google" className="w-5 h-5" />
              <span className="font-lexend text-[10px] font-normal leading-[100%] tracking-[0] text-[#1D1D1D]">
                Continue with Google
              </span>
            </button>

            <button
              type="button"
              onClick={() => alert("Microsoft OAuth")}
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-[23px] py-2 w-full md:w-[209px] h-[32px] bg-white hover:bg-gray-50 transition"
              aria-label="Continue with Microsoft"
            >
              <img src={microsoftIcon} alt="Microsoft" className="w-5 h-5" />
              <span className="font-lexend text-[10px] font-normal leading-[100%] tracking-[0] text-[#1D1D1D]">
                Continue with Microsoft
              </span>
            </button>

            <button
              type="button"
              onClick={() => alert("Apple OAuth")}
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-[23px] py-2 w-full md:w-[189px] h-[32px] bg-white hover:bg-gray-50 transition"
              aria-label="Continue with Apple"
            >
              <img src={appleIcon} alt="Apple" className="w-5 h-5" />
              <span className="font-lexend text-[10px] font-normal leading-[100%] tracking-[0] text-[#1D1D1D]">
                Continue with Apple
              </span>
            </button>
          </div>

          {/* divider */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-px bg-[#B3B3B3]" />
            <div className="text-xs text-[#999999] font-lexend">or continue with Email</div>
            <div className="flex-1 h-px bg-[#B3B3B3]" />
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* global form error */}
            {formError && (
              <div role="alert" className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {formError}
              </div>
            )}

            {/* email */}
            <div>
              <label htmlFor="email" className="block text-sm text-[#1D1D1D] mb-1 font-lexend">
                E-mail
              </label>
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onBlur={handleEmailBlur}
                placeholder="Enter your email"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : undefined}
                className={
                  "w-full max-w-[592px] h-[33px] rounded-md px-[12px] py-[10px] text-sm focus:outline-none " +
                  (emailError
                    ? "border-[1px] border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-[0.6px] border-gray-200 focus:ring-2 focus:ring-[#B3B3B3]")
                }
                autoComplete="email"
                required
              />
              {emailError && (
                <p id="email-error" className="mt-1 text-xs text-red-600">
                  {emailError}
                </p>
              )}
            </div>

            {/* password */}
            <div>
              <label htmlFor="password" className="block text-sm text-[#1D1D1D] mb-1 font-lexend">
                Password
              </label>
              <div className="relative max-w-[592px]">
                <input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Enter your password"
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? "password-error" : undefined}
                  className={
                    "w-full h-[33px] rounded-md px-[12px] py-[10px] text-sm focus:outline-none " +
                    (passwordError
                      ? "border-[1px] border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-[0.6px] border-gray-200 focus:ring-2 focus:ring-[#B3B3B3]")
                  }
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "👁️"}
                </button>
              </div>

              {passwordError && (
                <p id="password-error" className="mt-1 text-xs text-red-600">
                  {passwordError}
                </p>
              )}
            </div>

            {/* remember + forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-[#999999] rounded"
                />
                <span className="font-lexend text-[13px]">Remember me</span>
              </label>

              <a href="#" className="text-sm text-[#999999] hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* login button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#111111] text-white py-3 rounded-md text-sm font-medium hover:opacity-95 transition disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </div>

            {/* small links */}
            <div className="text-center text-sm text-[#999999]">
              New to AGV?{" "}
              <a href="#" className="text-[#1D1D1D] hover:underline font-lexend">
                Create account
              </a>
            </div>

            <div className="text-center text-sm text-[#999999]">
              Prefer passwordless?{" "}
              <a href="#" className="text-blue-600 hover:underline font-lexend">
                Use magic link
              </a>
            </div>
          </form>

          {/* Spacer */}
          <div className="mt-10" />

          {/* footer terms */}
          <div className="mt-6 text-center text-xs text-gray-400">
            By continuing you agree to the{" "}
            <a href="#" className="underline text-gray-600">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-gray-600">
              Privacy policy
            </a>
            .
          </div>
        </section>
      </main>
    </div>
  );
}
