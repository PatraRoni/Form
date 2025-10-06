// UsageSummary.jsx
import React from "react";
import {
  HardDrive,
  Users,
  Folder,
  Grid,
  Bell,
} from "lucide-react";

/**
 * UsageSummary
 * - Self-contained component (Tailwind CSS required).
 * - Accepts optional props to control numbers/progress; defaults are provided.
 */
export default function UsageSummary({
  storage = { used: 9, total: 18 }, // in TB
  storageProgress = 9 / 18,
  members = { active: 3, total: 10, pending: 0 },
  membersProgress = 4 / 10,
  projectsCount = 5,
  workspacesCount = 1,
}) {
  return (
    <div className="p-6 min-h-screen bg-[#070707] text-gray-100">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-poppins font-semibold">Usage Summary</h1>
         
        </div>
        <div className="text-gray-400"><Bell size={18} /></div>
        
      </div>
      <div className="h-1 mt-3 w-full bg-transparent border-t border-[#2F2F2F]" />

      {/* grid of cards (removed floating badge) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6 z-10 ">
        {/* Storage card */}
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-md bg-[#2F2F2F]">
                <HardDrive size={20} />
              </div>
              <div>
                <div className="text-[14px] font-lexend font-medium">Storage</div>
                <div className="text-[10px] font-poppins text-[#999999] mt-1">{storage.used} TB of {storage.total} TB</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <button className="text-[8px]  px-3 py-1 font-poppins bg-[#2F2F2F] rounded">Manage Storage</button>
            </div>
          </div>

          <div className="mt-4">
            <Progress value={storageProgress} />
          </div>
        </Card>

        {/* Members card */}
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-md bg-white/5">
                <Users size={20} />
              </div>
              <div>
                <div className="text-[14px] font-lexend font-medium">Members</div>
                <div className="text-[10px] font-poppins text-[#999999] mt-1">
                  {members.total ? `${members.active} of ${members.total} Members` : "0 Members"}
                  {members.pending ? `, ${members.pending} Pending` : ""}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <button className=" px-3 py-1 text-[8px] font-poppins bg-white/6 rounded">Manage Members</button>
            </div>
          </div>

          <div className="mt-4">
            <Progress value={membersProgress} />
          </div>
        </Card>

        {/* Projects card */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-md bg-white/5">
                <Folder size={18} />
              </div>
              <div>
                <div className="text-[14px] font-lexend font-medium">Projects</div>
                <div className="text-[10px] font-poppins text-[#999999]  mt-1">{projectsCount} Projects</div>
              </div>
            </div>

            <div>
              <button className="text-[8px] font-poppins px-3 py-1 bg-white/6 rounded">Manage Projects</button>
            </div>
          </div>
        </Card>

        {/* Workspaces card */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-md bg-white/5">
                <Grid size={18} />
              </div>
              <div>
                <div className="text-[14px] font-lexend font-medium">Workspaces</div>
                <div className="text-[10px] font-poppins text-[#999999]  mt-1">{workspacesCount} workspace{workspacesCount !== 1 ? "s" : ""}</div>
              </div>
            </div>

            <div>
              <button className="text-[8px] font-poppins px-3 py-1 bg-white/6 rounded">Manage Workspaces</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------- small presentational components ---------- */

function Card({ children }) {
  return (
    <div className="bg-[#1D1D1D] border border-white/6 rounded-xl p-4 shadow-sm">
      {children}
    </div>
  );
}

/**
 * Progress - thin subtle progress bar matching the screenshot
 * value: 0..1
 */
function Progress({ value = 0 }) {
  const pct = Math.max(0, Math.min(1, value));
  return (
    <div className="h-2 w-full bg-white/4 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: `${pct * 100}%`,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.85), rgba(255,255,255,0.2))",
        }}
        aria-valuenow={Math.round(pct * 100)}
        aria-valuemin="0"
        aria-valuemax="100"
        role="progressbar"
      />
    </div>
  );
}
