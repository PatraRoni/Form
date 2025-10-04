// src/components/SuccessScreen.jsx
import React from "react";
import bg from "../assets/bg.jpg"; // same background you used elsewhere
import checkIcon from "../assets/checkIcon.png"; // small check icon; replace if you have a different asset

/**
 * Props:
 *  - title (string)
 *  - subtitle (string)
 *  - onPrimary (fn) primary button click
 *  - onSecondary (fn) secondary button click
 *  - primaryLabel (string)
 *  - secondaryLabel (string)
 */
export default function SuccessScreen({
  title = "You're in!",
  subtitle = "Let’s set up F for your brand or clients.",
  onPrimary,
  onSecondary,
  primaryLabel = "Go to Main Workspace",
  secondaryLabel = "Choose/Create Workspace",
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-end bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      {/* main card container - pushed to the right on large screens, centered on small */}
      <main className="relative z-10 w-full max-w-[560px] mx-4 sm:mx-6 md:mx-8 lg:mr-20">
        <section
          className="bg-white rounded-[20px] shadow-2xl p-8 sm:p-10 flex flex-col"
          style={{ borderRadius: 20 }}
          aria-labelledby="success-title"
          role="region"
        >
          {/* Header */}
          <div className="mb-6">
            <h1 id="success-title" className="font-lexend text-[22px] font-semibold text-[#111827]">
              {title}
            </h1>
            <p className="text-xs text-[#9CA3AF] font-lexend">{subtitle}</p>
          </div>

          {/* Centered check icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-md bg-gray-100/80 flex items-center justify-center shadow-sm">
              {/* If you have a nicer SVG, replace the img with it */}
              <img src={checkIcon} alt="success" className="w-8 h-8" />
            </div>
          </div>

          {/* Buttons - primary then secondary */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={onPrimary}
              className="w-full bg-[#111111] text-white py-3 rounded-md text-sm font-medium hover:opacity-95 transition disabled:opacity-60"
            >
              {primaryLabel}
            </button>

            <button
              type="button"
              onClick={onSecondary}
              className="w-full border border-gray-300 bg-white text-sm rounded-md py-3 hover:bg-gray-50 transition"
            >
              {secondaryLabel}
            </button>
          </div>

          {/* flexible spacer so footer stays bottom-ish like in screenshot */}
          <div className="flex-1" />

          {/* footer terms */}
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
