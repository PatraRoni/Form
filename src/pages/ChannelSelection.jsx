import React from "react";
import bg from "../assets/bg.jpg";

export default function ChannelSelection({
  onConnect = (ch) => console.log("connect", ch),
  onContinue = () => console.log("continue"),
  onSkip = () => console.log("skip for now"),
  onBack = () => console.log("back"),
}) {
  const channels = [
    { id: "fb", name: "Facebook Messenger" },
    { id: "ig", name: "Instagram DM" },
    { id: "wa", name: "WhatsApp" },
    { id: "web", name: "Web Chat" },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-end bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <main className="relative z-10 w-full max-w-[640px] mx-4 sm:mx-6 md:mx-8 lg:mr-20">
        <section
          className="bg-white rounded-[20px] shadow-2xl p-6 sm:p-8"
          style={{ borderRadius: 20 }}
        >
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="font-lexend text-[22px] font-semibold text-[#111827]">Channels</h1>
              <p className="text-sm text-[#9CA3AF] font-lexend">Step 2 of 3</p>
            </div>
            <button
              type="button"
              onClick={onBack}
              className="text-[10px] font-lexend text-[#111827] underline"
            >
              Back
            </button>
          </div>

          {/* progress line */}
          <div className="h-[2px] bg-gray-200 mb-6">
            <div className="h-full bg-[#111827] w-2/3" />
          </div>

          {/* Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {channels.map((ch) => (
              <div
                key={ch.id}
                className="border border-[#B3B3B3] rounded-md p-4 flex flex-col justify-between hover:shadow-sm transition"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-[14px] font-lexend font-medium text-[#1D1D1D]">{ch.name}</h2>
                  <span className="w-2 h-2 bg-gray-300 rounded-full mt-1" />
                </div>
                <p className="text-[10px] font-lexend  text-[#B3B3B3] mt-1">Not Connected</p>

                <button
                  type="button"
                  onClick={() => onConnect(ch)}
                  className="text-[10px] font-lexend text-[#1D1D1D] underline mt-2 text-left"
                >
                  Connect
                </button>
              </div>
            ))}
          </div>

          {/* buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <button
              type="button"
              onClick={onSkip}
              className="flex-1 border border-[#B3B3B3] rounded-md py-3 text-[12px] font-lexend hover:bg-gray-50"
            >
              Skip for now
            </button>

            <button
              type="button"
              onClick={onContinue}
              className="flex-1 bg-[#1D1D1D] text-white rounded-md py-3 text-[12px] font-lexend font-medium hover:opacity-90"
            >
              Continue
            </button>
          </div>

          {/* footer link */}
          <div className="mt-8 text-center text-xs text-[#6B7280]">
            Or <a href="#" className="underline text-[#111827]">create your first workspace</a>
          </div>
        </section>
      </main>
    </div>
  );
}