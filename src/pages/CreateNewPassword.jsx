// src/components/CreateNewPassword.jsx
import React, { useMemo, useState } from "react";
import bg from "../assets/bg.jpg";

/*
Props:
 - onUpdate(newPassword) optional async callback; if provided should return a Promise
 - onBack() optional for a back link (not rendered in screenshot, but you can wire it)
*/
export default function CreateNewPassword({ onUpdate = async (p) => console.log("update", p) }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(""); // confirm field error
  const [loading, setLoading] = useState(false);

  // simple strength heuristic -> score 0..4
  const strength = useMemo(() => {
    if (!password) return { pct: 0, label: "", color: "bg-gray-200" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    const pct = Math.min(100, (score / 4) * 100);
    let label = "Very weak";
    let color = "bg-red-500";
    if (pct >= 75) { label = "Strong"; color = "bg-green-500"; }
    else if (pct >= 50) { label = "Okay"; color = "bg-yellow-400"; }
    else if (pct >= 25) { label = "Weak"; color = "bg-orange-400"; }
    return { pct, label, color };
  }, [password]);

  const passwordsMatch = password && password === confirm;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");

    if (!password) {
      setError("Enter a new password");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (!passwordsMatch) {
      setError("Enter the same password");
      return;
    }

    setLoading(true);
    try {
      await onUpdate(password);
      // caller may navigate away / show success
    } catch (err) {
      setError("Failed to update password");
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
      {/* dim overlay */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <main className="relative z-10 w-full max-w-[640px] mx-4 sm:mx-6 md:mx-8 lg:mr-20">
        <section className="bg-white rounded-[20px] shadow-2xl p-6 sm:p-8" style={{ borderRadius: 20 }}>
          <div className="mb-4">
            <h1 className="font-lexend text-[22px] font-semibold text-[#111827]">Create New Password</h1>
            <p className="text-xs text-[#6B7280] mt-1">Use a strong, unique password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm text-[#1D1D1D] mb-2 font-lexend">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="xxxxxxxxxxxx"
                  className="w-full h-[40px] rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none"
                  aria-label="New password"
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

              {/* strength bar */}
              <div className="mt-2">
                <div className="h-2 bg-gray-100 rounded-md overflow-hidden">
                  <div
                    className={`h-full ${strength.color}`}
                    style={{ width: `${strength.pct}%`, transition: "width 200ms ease" }}
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-[#1D1D1D] mb-2 font-lexend">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="xxxxxxxxxxxx"
                  className={
                    "w-full h-[40px] rounded-md px-3 py-2 text-sm focus:outline-none " +
                    (error && !passwordsMatch ? "border-[1px] border-red-500" : "border border-gray-200")
                  }
                  aria-invalid={!!error && !passwordsMatch}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 p-1"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? "Hide" : "👁️"}
                </button>
              </div>

              {/* inline error */}
              {error && !passwordsMatch && (
                <p className="mt-1 text-xs text-red-600">Enter the same password</p>
              )}
            </div>

            {/* Update button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#111111] text-white py-3 rounded-md text-sm font-medium hover:opacity-95 disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>

          {/* spacer to push footer down like screenshot */}
          <div className="flex-1 h-20" />

          <div className="mt-4 text-center text-xs text-gray-400">
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
