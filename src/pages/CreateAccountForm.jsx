// src/components/CreateAccountForm.jsx
import React, { useEffect, useRef, useState } from "react";
import bg from "../assets/bg.jpg";
import googleIcon from "../assets/google.png";
import microsoftIcon from "../assets/microsoft.png";
import appleIcon from "../assets/apple.png";

/*
Notes:
- Add Lexend Google font in index.html:
  <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600&display=swap" rel="stylesheet" />
- Extend tailwind.config.js: fontFamily: { lexend: ['"Lexend"', 'sans-serif'] }
*/

export default function CreateAccountForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // per-field errors + refs
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  
  useEffect(() => {
    try {
      const saved = localStorage.getItem("signup:email");
      if (saved) setEmail(saved);
    } catch {}
  }, []);

  const isValidEmail = (val) => /^\S+@\S+\.\S+$/.test(val);

  // returns true if all fields valid (sets per-field errors)
  const validateFields = () => {
    let ok = true;
    setEmailError("");
    setPasswordError("");
    setError("");

    if (!name.trim()) {
      ok = false;
      // we won't show an inline error for name in the screenshot, but you can enable if desired
    }

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
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      ok = false;
    }

    // focus first invalid field
    if (!ok) {
      if (emailError || !email || (email && !isValidEmail(email))) {
        setTimeout(() => emailRef.current?.focus(), 0);
      } else if (passwordError || !password) {
        setTimeout(() => passwordRef.current?.focus(), 0);
      }
    }

    return ok;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");
    const ok = validateFields();
    if (!ok) return;

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800)); // replace with API call
      localStorage.setItem("signup:email", email);
      // success behaviour
      console.log("account created", { name, email });
    } catch {
      setError("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailBlur = () => {
    if (!email) setEmailError("Email is required");
    else if (!isValidEmail(email)) setEmailError("Enter a valid email id");
    else setEmailError("");
  };

  const handleEmailChange = (v) => {
    setEmail(v);
    if (emailError) setEmailError("");
  };

  const handlePasswordChange = (v) => {
    setPassword(v);
    if (passwordError) setPasswordError("");
  };

  // password strength (kept from your previous version)
  const passwordStrength = (pw) => {
    if (!pw) return { label: "", score: 0, color: "bg-gray-200" };
    let score = 0;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    const pct = Math.min(100, (score / 4) * 100);
    let label = "Very weak";
    let color = "bg-red-500";
    if (pct >= 75) { label = "Strong"; color = "bg-green-500"; }
    else if (pct >= 50) { label = "Okay"; color = "bg-yellow-400"; }
    else if (pct >= 25) { label = "Weak"; color = "bg-orange-400"; }
    return { label, score: pct, color };
  };
  const strength = passwordStrength(password);

  return (
    <div
      className="min-h-screen flex items-center justify-end bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      {/* main container pushed toward right on medium+ screens, centers on small screens */}
      <main className="relative z-10 w-full max-w-[560px] mx-4 sm:mx-6 md:mx-8 lg:mr-20">
        <section
          className="bg-white rounded-[20px] shadow-2xl p-6 sm:p-8"
          style={{ borderRadius: 20 }}
        >
          {/* Header */}
          <div className="mb-4">
            <h1 className="font-lexend text-[20px] font-semibold text-[#111827]">Create Account</h1>
            <p className="text-xs text-[#9CA3AF] font-lexend">SSO or email to get started</p>
          </div>

          {/* Social buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-3 mb-5">
            <button
              type="button"
              onClick={() => alert("Google OAuth")}
              className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 h-[36px] bg-white hover:bg-gray-50 transition w-full sm:w-[170px] justify-center"
              aria-label="Continue with Google"
            >
              <img src={googleIcon} alt="Google" className="w-4 h-4" />
              <span className="font-lexend text-[10px] font-normal text-[#111827]">Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => alert("Microsoft OAuth")}
              className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 h-[36px] bg-white hover:bg-gray-50 transition w-full sm:w-[170px] justify-center"
              aria-label="Continue with Microsoft"
            >
              <img src={microsoftIcon} alt="Microsoft" className="w-4 h-4" />
              <span className="font-lexend text-[10px] font-normal text-[#111827]">Continue with Microsoft</span>
            </button>

            <button
              type="button"
              onClick={() => alert("Apple OAuth")}
              className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 h-[36px] bg-white hover:bg-gray-50 transition w-full sm:w-[140px] justify-center"
              aria-label="Continue with Apple"
            >
              <img src={appleIcon} alt="Apple" className="w-4 h-4" />
              <span className="font-lexend text-[10px] font-normal text-[#111827]">Continue with Apple</span>
            </button>
          </div>

          {/* divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <div className="text-xs text-[#9CA3AF] font-lexend">or Sign-up with Email</div>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && (
              <div role="alert" className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            {/* full name */}
            <div>
              <label htmlFor="name" className="block text-sm text-[#111827] mb-1 font-lexend">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full h-[40px] border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5E7EB]"
                required
              />
            </div>

            {/* email with inline error */}
            <div>
              <label htmlFor="email" className="block text-sm text-[#111827] mb-1 font-lexend">
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
                  "w-full h-[40px] rounded-md px-3 py-2 text-sm focus:outline-none " +
                  (emailError
                    ? "border-[1px] border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border border-gray-200 focus:ring-2 focus:ring-[#E5E7EB]")
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

            {/* password + strength */}
            <div>
              <label htmlFor="password" className="block text-sm text-[#111827] mb-1 font-lexend">
                Password
              </label>
              <div className="relative">
                <input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="At least 8 characters"
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? "password-error" : undefined}
                  className={
                    "w-full h-[40px] rounded-md px-3 py-2 text-sm focus:outline-none " +
                    (passwordError
                      ? "border-[1px] border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border border-gray-200 focus:ring-2 focus:ring-[#E5E7EB]")
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 p-1"
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

              {/* strength bar */}
              <div className="mt-2">
                <div className="h-2 bg-gray-100 rounded-md overflow-hidden">
                  <div
                    className={`h-full ${strength.color}`}
                    style={{ width: `${strength.score}%`, transition: "width 200ms ease" }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-[#6B7280] mt-2">
                  <div>{strength.label || " "}</div>
                  <div className="flex gap-1">
                    <div className="w-6 h-1 bg-gray-200 rounded" />
                    <div className="w-6 h-1 bg-gray-200 rounded" />
                    <div className="w-6 h-1 bg-gray-200 rounded" />
                    <div className="w-6 h-1 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* checkbox */}
            <label className="inline-flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm text-[#6B7280]">
                I agree to the <span className="text-[#111827] underline">Terms</span> and{" "}
                <span className="text-[#111827] underline">Privacy</span>
              </span>
            </label>

            {/* CTA */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#111111] text-white py-3 rounded-md text-sm font-medium hover:opacity-95 transition disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create account"}
              </button>
            </div>

            {/* have account */}
            <div className="text-center text-sm text-[#6B7280]">
              Have an account? <a href="#" className="text-[#111827] underline">log-in</a>
            </div>
          </form>

          {/* larger spacer to match the screenshot gap between form and footer */}
          <div className="mt-12" />

          {/* footer terms */}
          <div className="mt-6 text-center text-xs text-gray-400">
            By continuing you agree to the{" "}
            <a href="#" className="underline text-gray-600">Terms</a> and{" "}
            <a href="#" className="underline text-gray-600">Privacy policy</a>.
          </div>
        </section>
      </main>
    </div>
  );
}
