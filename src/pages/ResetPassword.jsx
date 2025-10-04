// src/components/ResetPassword.jsx
import React, { useRef, useState } from "react";
import bg from "../assets/bg.jpg";

/*
Props:
 - onBack() optional callback for the Back link
 - onSend(email) optional callback to actually send reset link (should return a Promise if async)
*/
export default function ResetPassword({ onBack = () => {}, onSend = async (email) => console.log("send reset", email) }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);

  const isValidEmail = (val) => {
    if (!val) return false;
    return /^\S+@\S+\.\S+$/.test(val.trim());
  };

  const handleBlur = () => {
    if (!email) setError("Enter an email address");
    else if (!isValidEmail(email)) setError("Enter a valid email id");
    else setError("");
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");
    if (!email) {
      setError("Enter an email address");
      setTimeout(() => emailRef.current?.focus(), 0);
      return;
    }
    if (!isValidEmail(email)) {
      setError("Enter a valid email id");
      setTimeout(() => emailRef.current?.focus(), 0);
      return;
    }

    setLoading(true);
    try {
      await onSend(email.trim());
      // optionally show a toast or success screen here
    } catch (err) {
      // simple fallback message
      setError("Failed to send reset link. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-end bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <main className="relative z-10 w-full max-w-[640px] mx-4 sm:mx-6 md:mx-8 lg:mr-20">
        <section
          className="bg-white rounded-[20px] shadow-2xl p-6 sm:p-8 flex flex-col"
          style={{ borderRadius: 20 }}
        >
          {/* header */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h1 className="font-lexend text-[22px] font-semibold text-[#111827]">Reset Password</h1>
              <p className="text-[10px] font-lexend text-[#6B7280] mt-1">We'll email you a reset link</p>
            </div>

            <button onClick={onBack} className="text-[10px] font-lexend text-[#111827] underline">
              Back
            </button>
          </div>

          {/* spacer (you can include progress or divider if needed) */}
          <div className="mb-4" />

          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* E-mail label */}
            <label htmlFor="rp-email" className="block text-[14px] text-[#1D1D1D] mb-2 font-lexend">
              E-mail
            </label>

            {/* E-mail input */}
            <input
              id="rp-email"
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              onBlur={handleBlur}
              placeholder="you@company.com"
              aria-invalid={!!error}
              aria-describedby={error ? "rp-email-error" : undefined}
              className={
                "w-full h-[40px] font-lexend rounded-md px-3 py-2 text-[10px] focus:outline-none " +
                (error
                  ? "border-[1px] border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border border-gray-200 focus:ring-2 focus:ring-[#E5E7EB]")
              }
            />

            {/* error helper */}
            {error && (
              <p id="rp-email-error" className="mt-1 text-xs text-red-600">
                {error}
              </p>
            )}

            {/* primary CTA */}
            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full bg-[#1D1D1D] text-white py-3 rounded-md text-[14px] font-lexend font-medium hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset link"}
            </button>

            {/* secondary CTA */}
            <button
              type="button"
              onClick={onBack}
              className="mt-4 w-full border border-gray-300 rounded-md py-3 text-[14px] font-lexend hover:bg-gray-50"
            >
              Back to login
            </button>
          </form>

          {/* spacer to push footer down like screenshot */}
          <div className="flex-1" />

          {/* footer */}
          <div className="mt-6 text-center text-xs font-lexend text-[#999999]">
            By continuing you agree to the{" "}
            <a href="#" className="underline font-lexend text-[#1D1D1D]">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline font-lexend text-[#1D1D1D]">
              Privacy policy
            </a>
            .
          </div>
        </section>
      </main>
    </div>
  );
}
