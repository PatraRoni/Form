// src/components/WorkspaceFinish.jsx
import React, { useState } from "react";
import bg from "../assets/bg.jpg";

/*
Props:
 - data: { name, useCase, timezone, channels }  (channels can be string or array)
 - onBack(): callback for Back link
 - onCreate(payload): called when Create Workspace clicked
*/
export default function WorkspaceFinish({ data = {}, onBack = () => {}, onCreate = () => {} }) {
  const { name = "Main", useCase = "Agency", timezone = "UTC+05:30", channels = "None" } = data;

  const [inviteEmail, setInviteEmail] = useState("");
  const [teammates, setTeammates] = useState([]);
  const [inviteError, setInviteError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (e) => {
    if (!e) return false;
    return /^\S+@\S+\.\S+$/.test(e.trim());
  };

  const addTeammate = () => {
    const email = inviteEmail.trim();
    if (!email) {
      setInviteError("Enter an email address");
      return;
    }
    if (!isValidEmail(email)) {
      setInviteError("Enter a valid email id");
      return;
    }
    if (teammates.includes(email)) {
      setInviteError("Already added");
      return;
    }
    setTeammates((t) => [...t, email]);
    setInviteEmail("");
    setInviteError("");
  };

  const removeTeammate = (value) => {
    setTeammates((t) => t.filter((x) => x !== value));
  };

  const handleCreate = async () => {
    // If there's text in invite input, try to validate/add it first
    if (inviteEmail.trim()) {
      if (!isValidEmail(inviteEmail.trim())) {
        setInviteError("Enter a valid email id");
        return;
      }
      if (!teammates.includes(inviteEmail.trim())) {
        setTeammates((t) => [...t, inviteEmail.trim()]);
      }
      setInviteEmail("");
      setInviteError("");
    }

    setLoading(true);
    try {
      const payload = { name, useCase, timezone, channels, teammates };
      // simulate API delay; replace with real call
      await new Promise((r) => setTimeout(r, 700));
      onCreate(payload);
    } catch (err) {
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
        <section
          className="bg-white rounded-[20px] shadow-2xl p-6 sm:p-8 flex flex-col"
          style={{ borderRadius: 20 }}
        >
          {/* header */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h1 className="font-lexend text-[22px] font-lexend font-semibold text-[#111827]">Finish</h1>
              <p className="text-[10px] font-lexend text-[#6B7280] ">Step 3 of 3</p>
            </div>

            <button onClick={onBack} className="text-[10px] text-[#111827] font-lexend underline">
              Back
            </button>
          </div>

          {/* progress bar */}
          <div className="h-[3px] bg-gray-200 mb-6 rounded-full overflow-hidden">
            <div className="h-full bg-black" style={{ width: "100%" }} />
          </div>

          {/* details box */}
          <div className="border border-gray-200 rounded-md p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-lexend text-[#B3B3B3]">Name</div>
                <div className="text-[14px] font-lexend text-[#1D1D1D] ">{name}</div>
              </div>

              <div>
                <div className="text-[10px] font-lexend text-[#B3B3B3]">Use-case</div>
                <div className="text-[14px] font-lexend text-[#1D1D1D] ">{useCase}</div>
              </div>

              <div>
                <div className="text-[10px] font-lexend text-[#B3B3B3]">Timezone</div>
                <div className="text-[14px] font-lexend text-[#1D1D1D] ">{timezone}</div>
              </div>

              <div>
                <div className="text-[10px] font-lexend text-[#B3B3B3]">Channels</div>
                <div className="text-[14px] font-lexend text-[#1D1D1D] ">
                  {Array.isArray(channels) ? channels.join(", ") : channels}
                </div>
              </div>
            </div>
          </div>

          {/* invite teammates row */}
          <div className="flex gap-3 items-start mb-1">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => {
                setInviteEmail(e.target.value);
                if (inviteError) setInviteError("");
              }}
              placeholder="Invite teammates (email)"
              aria-invalid={!!inviteError}
              aria-describedby={inviteError ? "invite-error" : undefined}
              className={
                "flex-1 h-[40px] rounded-md px-3 text-[10px] font-lexend focus:outline-none " +
                (inviteError
                  ? "border-[1px] border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border border-gray-200 focus:ring-2 focus:ring-[#E5E7EB]")
              }
            />
            <button
              type="button"
              onClick={addTeammate}
              className="h-[40px] px-3 rounded-md bg-gray-800 font-lexend text-white text-sm"
            >
              Add
            </button>
          </div>

          {/* inline error helper */}
          {inviteError && (
            <p id="invite-error" className="mt-1 text-xs text-red-600 mb-4">
              {inviteError}
            </p>
          )}

          {/* show small teammate chips if present */}
          {teammates.length > 0 && (
            <div className="mb-6">
              <div className="flex gap-2 flex-wrap">
                {teammates.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1 rounded-full font-lexend bg-gray-100 text-sm text-[#111827]"
                  >
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => removeTeammate(t)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                      aria-label={`Remove ${t}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleCreate}
              disabled={loading}
              className="w-full bg-[#111111] text-white py-3 rounded-md text-sm font-lexend font-medium hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Workspace"}
            </button>
          </div>

          {/* flexible spacer */}
          <div className="flex-1" />

          {/* footer */}
          <div className="mt-4 text-center text-xs font-lexend text-gray-400">
            By continuing you agree to the{" "}
            <a href="#" className="underline font-lexend text-gray-600">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline font-lexend text-gray-600">
              Privacy policy
            </a>
            .
          </div>
        </section>
      </main>
    </div>
  );
}
