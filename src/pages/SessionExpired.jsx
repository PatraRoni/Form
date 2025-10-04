// src/components/SessionExpired.jsx
import React from "react";
import bg from "../assets/bg.jpg";
import alertIcon from "../assets/alert.png"; // replace with your icon (SVG recommended)

/**
 * SessionExpired
 * Props:
 *  - onLogin() -> callback when user clicks "Log in"
 *  - title (string)
 *  - subtitle (string)
 */
export default function SessionExpired({
  onLogin = () => console.log("login clicked"),
  title = "Session Expired",
  subtitle = "Please log in again to continue",
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* dim overlay for contrast */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      {/* card */}
      <main className="relative z-10 w-full max-w-[640px] mx-4 sm:mx-6 md:mx-8">
        <section
          className="bg-white rounded-[20px] shadow-2xl p-10 flex flex-col items-center"
          role="dialog"
          aria-labelledby="session-title"
          aria-describedby="session-desc"
          style={{ borderRadius: 20 }}
        >
          {/* Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
              <img src={alertIcon} alt="" className="w-8 h-8" />
            </div>
          </div>

          {/* Title */}
          <h1 id="session-title" className="font-lexend text-lg font-semibold text-[#111827] mb-1">
            {title}
          </h1>

          {/* Subtitle */}
          <p id="session-desc" className="text-sm text-[#6B7280] mb-8">
            {subtitle}
          </p>

          {/* CTA */}
          <div className="w-full">
            <button
              type="button"
              onClick={onLogin}
              className="w-full bg-[#111111] text-white py-3 rounded-md text-sm font-medium hover:opacity-95 transition"
            >
              Log in
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
