// UsersSection.jsx
import React, { useState, useMemo } from "react";
import { Bell, Search, Plus } from "lucide-react";

/**
 * UsersSection
 * - TailwindCSS required
 * - No yellow badge included
 */
export default function UsersSection({ initialUsers }) {
  // sample data if none provided
  const sample = [
    {
      id: 1,
      name: "Lorem Ipsum",
      email: "loremipsum@gmail.com",
      role: "Member",
      joined: "Aug 10, 2025",
      lastActive: "28 Hours ago",
      status: "Active",
      avatar: "https://picsum.photos/seed/1/40",
    },
    {
      id: 2,
      name: "Lorem Ipsum",
      email: "loremipsum@gmail.com",
      role: "Member",
      joined: "Aug 10, 2025",
      lastActive: "02 Hours ago",
      status: "Active",
      avatar: "https://picsum.photos/seed/2/40",
    },
    {
      id: 3,
      name: "Lorem Ipsum",
      email: "loremipsum@gmail.com",
      role: "Member",
      joined: "Aug 10, 2025",
      lastActive: "09 Hours ago",
      status: "Inactive",
      avatar: "https://picsum.photos/seed/3/40",
    },
    {
      id: 4,
      name: "Lorem Ipsum",
      email: "loremipsum@gmail.com",
      role: "Member",
      joined: "Aug 10, 2025",
      lastActive: "28 Minutes ago",
      status: "Active",
      avatar: "https://picsum.photos/seed/4/40",
    },
  ];

  const [users] = useState(initialUsers ?? sample);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState({}); // map id -> boolean
  const [allChecked, setAllChecked] = useState(false);

  const filtered = useMemo(() => {
    if (!query.trim()) return users;
    const q = query.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.role && u.role.toLowerCase().includes(q))
    );
  }, [users, query]);

  function toggleRow(id) {
    setSelected((s) => {
      const next = { ...s, [id]: !s[id] };
      // update allChecked
      const all = users.length > 0 && users.every((u) => next[u.id]);
      setAllChecked(all);
      return next;
    });
  }

  function toggleAll() {
    const nextVal = !allChecked;
    const next = {};
    users.forEach((u) => (next[u.id] = nextVal));
    setSelected(next);
    setAllChecked(nextVal);
  }

  return (
    <div className="p-6 min-h-screen bg-[#070707] text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <div className="h-1 mt-3 w-full bg-transparent border-t border-white/6" />
        </div>

        <div >
          <Bell size={18} className="text-gray-400" />
          
        </div>
      </div>
      <div className="h-1 mt-3 w-full bg-transparent border-t border-[#2F2F2F]" />

      {/* Search */}
        {/* container: stacked on small screens, side-by-side on md+ */}
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-2">

        {/* search: full width on mobile, limited on md+ */}
        <div className="w-full md:max-w-md">
            <label htmlFor="user-search" className="sr-only">Search users</label>
            <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
            </div>

            <input
                id="user-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search User"
                className="w-full pl-10 pr-3 py-2 bg-[#2F2F2F] border border-white/6 rounded text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/10 font-poppins text-[#999999]"
            />
            </div>
        </div>

        {/* right: actions — won't shrink and stays to the right on md+ */}
        <div className="flex items-center gap-3 flex-shrink-0">
            <button
            type="button"
            className="flex items-center gap-2 text-sm px-3 py-2 bg-[#2F2F2F] rounded hover:bg-white/8 transition"
            >
            <Plus size={14} /> <span>New User</span>
            </button>
        </div>
        </div>


      {/* Table container */}
      <div className="overflow-x-auto">
        <div className="min-w-full rounded-xl border border-white/6 p-3">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="text-xs text-gray-400">
                <th className="w-12 px-2 py-3">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded bg-white/6"
                    aria-label="Select all users"
                  />
                </th>
                <th className="text-[12px] font-poppins text-[#999999] mt-1 px-4 py-3 ">Name</th>
                <th className="text-[12px] font-poppins text-[#999999] mt-1 px-4 py-3 ">Email Address</th>
                <th className="text-[12px] font-poppins text-[#999999] mt-1 px-4 py-3 ">Role</th>
                <th className="text-[12px] font-poppins text-[#999999] mt-1 px-4 py-3 ">Joined On</th>
                <th className="text-[12px] font-poppins text-[#999999] mt-1 px-4 py-3 ">Last Active</th>
                <th className="text-[12px] font-poppins text-[#999999] mt-1 px-4 py-3 text-right">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t border-white/6">
                  <td className="px-2 py-4 align-top">
                    <input
                      type="checkbox"
                      checked={!!selected[u.id]}
                      onChange={() => toggleRow(u.id)}
                      className="h-4 w-4 rounded bg-white/6"
                      aria-label={`Select ${u.name}`}
                    />
                  </td>

                  <td className="px-4 py-4 align-top">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-white/6"
                      />
                      <div>
                        <div className="text-[12px] font-lexend font-medium ">{u.name}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 align-top">
                    <div className="text-[12px] font-lexend font-medium">{u.email}</div>
                  </td>

                  <td className="px-4 py-4 align-top">
                    <div className="text-[12px] font-lexend font-medium">{u.role}</div>
                  </td>

                  <td className="px-4 py-4 align-top">
                    <div className="text-[12px] font-lexend font-medium">{u.joined}</div>
                  </td>

                  <td className="px-4 py-4 align-top">
                    <div className="text-[12px] font-lexend font-medium">{u.lastActive}</div>
                  </td>

                  <td className="px-4 py-4 align-top text-right">
                    <span
                      className={`inline-block text-xs px-3 py-1 rounded-full ${
                        u.status === "Active" ? "bg-emerald-800 text-emerald-300" : "bg-white/6 text-gray-300"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
