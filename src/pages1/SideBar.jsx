// SideBar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  User,
  Clock,
  Bell,
  CreditCard,
  Folder as FolderIcon,
  Users,
  HelpCircle,
  Home as HomeIcon,
} from "lucide-react";

export default function SideBar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false); // collapse chevron (visual only)
  const [active, setActive] = useState("Profile");

  const menu = [
    { key: "Profile", label: "Profile", icon: User, to: "/profile" },
    { key: "Usage", label: "Usage", icon: Clock, to: "/usage" },
    { key: "Notifications", label: "Notifications", icon: Bell, to: "/notifications" },
    { key: "Billing", label: "Billing", icon: CreditCard, to: "/billing" },
    { key: "Projects", label: "Projects", icon: FolderIcon, to: "/projects" },
    { key: "Users", label: "Users", icon: Users, to: "/users" },
  ];

  function handleNav(item) {
    setActive(item.key);
    if (item.to) navigate(item.to);
  }

  return (
    <aside className="w-64 min-h-screen bg-[#1D1D1D] text-gray-200 rounded-r-2xl p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* colorful square avatar */}
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-semibold"
            style={{ background: "linear-gradient(135deg,#9b8cff,#ff9bb3)", color: "#000" }}
          >
            S
          </div>
          <div className="leading-tight">
            <div className="text-sm font-medium">Samy’s Account</div>
          </div>
        </div>

        <button
          type="button"
          aria-label="toggle"
          onClick={() => setCollapsed((s) => !s)}
          className="p-1 rounded hover:bg-white/5"
        >
          <ChevronDown size={18} className={`${collapsed ? "rotate-180" : ""} transition-transform`} />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-4">Settings</h3>

      {/* Menu */}
      <nav className="flex-1 overflow-auto">
        <ul className="flex flex-col gap-2">
          {menu.map((m) => {
            const Icon = m.icon;
            const isActive = active === m.key;
            return (
              <li key={m.key}>
                <button
                  onClick={() => handleNav(m)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition
                    ${isActive ? "bg-white/6 ring-1 ring-white/8" : "hover:bg-white/3"}`}
                >
                  <span className={`p-2 rounded-full ${isActive ? "bg-white/8" : "bg-transparent"}`}>
                    <Icon size={16} />
                  </span>
                  <span className={`text-sm ${isActive ? "font-medium" : "font-light"}`}>{m.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="mt-6">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => { setActive("Support"); navigate("/support"); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/3 transition ${active === "Support" ? "bg-white/6" : ""}`}
          >
            <HelpCircle size={16} />
            <span className="text-sm font-light">Support</span>
          </button>

          <button
            onClick={() => { setActive("Home"); navigate("/"); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/3 transition ${active === "Home" ? "bg-white/6" : ""}`}
          >
            <HomeIcon size={16} />
            <span className="text-sm font-light">Home</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
