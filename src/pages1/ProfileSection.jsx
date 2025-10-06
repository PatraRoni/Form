// ProfileSection.jsx
import React, { useState } from "react";
import { Bell, Edit3 } from "lucide-react";
import person from "../assets/person.jpg"

export default function ProfileSection() {
  const [gaEnabled, setGaEnabled] = useState(false);

  return (
    <div className="p-6 min-h-screen bg-[#070707] text-gray-100">
      {/* Page header */}
      <div className="flex items-center justify-between border-b border-white/6 pb-4 mb-6">
        <h1 className="text-xl font-semibold">Profile</h1>
        <Bell size={18} className="text-gray-300" />
      </div>
      <div className="h-1 mt-3 w-full bg-transparent border-t border-[#2F2F2F]" />
      {/* Personal Information heading */}
      <section className="mb-8">
      <div className="flex mb-3">
        <h2 className="text-[18px] font-poppins font-semibold ">Personal Information</h2>
        <p className="text-[10px] font-poppins text-[#999999] ml-4 mt-2">Set up Your Profile</p>
        </div>
        {/* Cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left card: Avatar + name */}
          <div className="bg-[#0f0f10] border border-white/6 rounded-xl p-6 flex flex-col items-center gap-3">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-1 ring-white/6">
              <img
                src={person}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center">
              <div className="text-[18px] font-poppins font-medium">Pixel Samy</div>
              <div className="text-[10px] font-poppins text-[#999999] mt-1">[UTC -04:00] America/New York</div>
            </div>
          </div>

          {/* Right card: details */}
          <div className="md:col-span-2 bg-[#0f0f10] border border-white/6 rounded-xl p-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div className="text-[14px] font-lexend ">Email</div>
                <div className="text-[12px] font-poppins text-[#999999]">loremipsum@gmail.com</div>
              </div>

              
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
                <div className="text-[14px] font-poppins">Password</div>
                <div className="text-[12px]  font-poppins text-[#999999]">loremipsum</div>
            </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[14px] font-poppins ">Google Authentication</div>
              </div>

              {/* Toggle */}
              <button
                onClick={() => setGaEnabled((s) => !s)}
                className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none ${
                  gaEnabled ? "bg-emerald-400" : "bg-white/6"
                }`}
                aria-pressed={gaEnabled}
              >
                <span
                  className={`transform transition-transform w-4 h-4 bg-white rounded-full ml-1 ${
                    gaEnabled ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[14px] font-poppins">Log-out of All Sessions</div>
              </div>

              <button className="px-3 py-1 font-poppins bg-[#FF7C741F] text-xs rounded text-[#F2483E] hover:bg-[#532323] transition">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Preferences */}
      <section>
      <div className="flex mb-2">
        <h3 className="text-[18px] font-poppins font-semibold ">Cookie Preferences</h3>
        <p className="text-[10px] font-poppins text-[#999999] ml-5 mt-2 ">Set how your data and cookie preferences are handled</p>
      </div>
        <div className="bg-[#0f0f10] border border-white/6 rounded-xl p-3 flex items-center justify-between">
          <div className="text-[14px]  font-poppins">Cookie Preferences</div>
          <div className="flex items-center gap-2">
            <button className="text-xs px-3 py-1 bg-white/6 font-poppins rounded">Edit</button>
            <button title="quick edit" className="p-2 rounded hover:bg-white/4">
              <Edit3 size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
