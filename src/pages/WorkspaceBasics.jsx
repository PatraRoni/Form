// src/components/WorkspaceBasics.jsx
import React, { useState } from "react";
import bg from "../assets/bg.jpg";

/*
Notes:
- Add Lexend Google font in index.html if not already present:
  <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600&display=swap" rel="stylesheet" />
- Add font-lexend to tailwind.config.js if you want the utility `font-lexend`.
*/

export default function WorkspaceBasics({
  initial = { name: "", useCase: "Agency", timezone: "UTC+05:30" },
  onCancel,
  onBack,
  onContinue,
}) {
  const [name, setName] = useState(initial.name);
  const [useCase, setUseCase] = useState(initial.useCase);
  const [timezone, setTimezone] = useState(initial.timezone);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Workspace name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = async (e) => {
    e?.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // simulate async; replace with API call if needed
      await new Promise((r) => setTimeout(r, 500));
      onContinue?.({ name: name.trim(), useCase, timezone });
    } catch {
      // handle submit error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-end bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* semi-dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <main className="relative z-10 w-full max-w-[560px] mx-4 sm:mx-6 md:mx-8 lg:mr-20">
        <section
          className="bg-white rounded-[18px] shadow-2xl p-6 sm:p-8 flex flex-col"
          style={{ borderRadius: 18 }}
          role="region"
          aria-labelledby="basics-title"
        >
          {/* header row */}
          <div className="flex items-start justify-between">
            <div>
              <h2 id="basics-title" className="font-lexend text-[20px] font-semibold text-[#111827]">
                Basics
              </h2>
              <div className="text-xs text-[#6B7280] mt-1">Step 1 of 3</div>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="text-xs font-lexend text-[#111827] text-[10px] underline"
              aria-label="Back"
            >
              Back
            </button>
          </div>

          {/* progress bar */}
          <div className="mt-4 w-full">
            <div className="h-[3px] bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-black" style={{ width: "30%" }} />
            </div>
          </div>

          {/* form */}
          <form className="mt-5 flex flex-col flex-1" onSubmit={handleContinue} noValidate>
            {/* Workspace name */}
            <div className="mb-4 max-w-full">
              <label htmlFor="ws-name" className="block text-sm text-[#111827] mb-2 font-lexend">
                Workspace name
              </label>
              <input
                id="ws-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your workspace name"
                className={
                  "w-full h-[40px] rounded-md px-3 py-2 text-[10px] font-lexend focus:outline-none " +
                  (errors.name ? "border border-red-500" : "border border-gray-200")
                }
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "ws-name-error" : undefined}
              />
              {errors.name && (
                <p id="ws-name-error" className="mt-1 text-xs text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Use-case */}
            <div className="mb-4 max-w-full">
              <label htmlFor="ws-usecase" className="block text-sm text-[#111827] mb-2 font-lexend">
                Use-case
              </label>
              <select
                id="ws-usecase"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full h-[40px] rounded-md px-3 py-2 text-[10px] font-lexend border border-gray-200 focus:outline-none"
              >
                <option>Agency</option>
                <option>Freelancer</option>
                <option>In-house</option>
                <option>Startup</option>
                <option>Other</option>
              </select>
            </div>

            {/* Timezone */}
            <div className="mb-6 max-w-full">
              <label htmlFor="ws-tz" className="block text-sm text-[#111827] mb-2 font-lexend">
                Timezone
              </label>
              <input
                id="ws-tz"
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                placeholder="UTC+05:30"
                className="w-full h-[40px] rounded-md px-3 py-2 text-[10px] font-lexend border border-gray-200 focus:outline-none"
              />
            </div>

            {/* buttons row */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 h-[42px] rounded-md border border-gray-300 text-sm font-medium bg-white hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 h-[42px] rounded-md bg-[#111111] text-white text-sm font-medium hover:opacity-95 disabled:opacity-60"
              >
                {loading ? "Please wait..." : "Continue"}
              </button>
            </div>

            {/* flexible spacer so footer stays low like screenshot */}
            <div className="flex-1" />

            {/* bottom helper link */}
            <div className="mt-6 text-center text-xs text-[#6B7280]">
              Or{" "}
              <a href="#" className="underline text-[#111827]">
                create your first workspace
              </a>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
