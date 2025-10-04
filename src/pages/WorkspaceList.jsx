import React, { useMemo, useState } from "react";
import bg from "../assets/bg.jpg";
import plus from "../assets/plus.png"

/**
 * WorkspaceList
 * - Shows a searchable grid of workspace cards
 * - Props:
 *    workspaces: Array<{ id, name, members }>
 *    onOpen(workspace) - callback when "Open" clicked
 *    onCreate() - callback when "New Workspace" clicked
 *
 * Drop this file in src/components and import where needed.
 */
export default function WorkspaceList({
  workspaces: initial = null,
  onOpen = (w) => console.log("open", w),
  onCreate = () => console.log("create workspace"),
}) {
  const demo = [
    { id: "1", name: "Samy's Account", members: 3, color: "from-pink-400 to-yellow-300" },
    { id: "2", name: "Lorem's Account", members: 3, color: "from-yellow-200 to-orange-300" },
    { id: "3", name: "Lorem's Account", members: 3, color: "from-fuchsia-400 to-red-300" },
    { id: "4", name: "Lorem's Account", members: 3, color: "from-sky-300 to-indigo-300" },
    { id: "5", name: "Lorem's Account", members: 3, color: "from-rose-200 to-pink-200" },
    { id: "6", name: "Lorem's Account", members: 3, color: "from-sky-200 to-blue-300" },
  ];

  const workspaces = initial ?? demo;
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return workspaces;
    return workspaces.filter((w) => w.name.toLowerCase().includes(q));
  }, [query, workspaces]);

  return (
    <div
      className="min-h-screen flex items-center justify-end bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* overlay for contrast */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <main className="relative z-10 w-full max-w-[720px] mx-4 sm:mx-6 md:mx-8 lg:mr-20">
        <section className="bg-white rounded-[18px] shadow-2xl p-6 sm:p-8" style={{ borderRadius: 18 }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-lexend text-[22px] font-semibold text-[#111827]">Workspaces</h2>
              <p className="text-xs text-[#6B7280] mt-1">Choose a workspace or create a new one.</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onCreate}
                className="inline-flex font-lexend items-center text-[10px] gap-2 rounded-md border-[#B3B3B3] bg-[#2F2F2F] text-white text-sm px-3 py-2"
              >
                <img src={plus} className="h-3 w-3" alt=""/>
                New Workspace
              </button>
            </div>
          </div>

          {/* search */}
          <div className="mb-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search workspaces"
              className="w-full h-[40px] rounded-md border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E6EEF6]"
              aria-label="Search workspaces"
            />
          </div>

          {/* grid of cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((ws) => (
              <div key={ws.id} className="flex items-center justify-between border border-gray-200 rounded-md p-3">
                <div className="flex items-center gap-3">
                  {/* avatar / gradient tile with initial */}
                  <div
                    className={`w-12 h-12 rounded-md flex items-center justify-center text-white font-medium text-sm bg-gradient-to-br ${
                      ws.color || "from-sky-300 to-indigo-300"
                    }`}
                    aria-hidden
                  >
                    {ws.name ? ws.name.charAt(0).toUpperCase() : "W"}
                  </div>

                  <div>
                    <div className="text-sm font-lexend text-[#111827]">{ws.name}</div>
                    <div className="text-xs text-[#6B7280]">{ws.members} members</div>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => onOpen(ws)}
                    className="text-sm text-[#111827] underline"
                  >
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* spacer and bottom link */}
          <div className="mt-6 flex-1" />

          <div className="mt-6 text-center text-xs text-[#6B7280]">
            Or <a href="#" className="underline text-[#111827]">create your first workspace</a>
          </div>
        </section>
      </main>
    </div>
  );
}
