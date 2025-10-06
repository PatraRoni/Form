// NotificationsPanel.jsx
import React, { useState } from "react";
import { Bell } from "lucide-react";

/**
 * NotificationsPanel
 * - Drop into any page that already has Tailwind loaded.
 * - You can pass `email` as a prop if you want to show a real email.
 */
export default function NotificationsPanel({ email = "loremipsum@gmail.com" }) {
  // data-driven groups so structure matches screenshot
  const commentsList = [
    { key: "generalComments", title: "General Comments", subtitle: "When someone comments on an asset" },
    { key: "commentReplies", title: "Comments Replies", subtitle: "When someone replies to your comments" },
    { key: "mentions", title: "@Mentions", subtitle: "When someone @mentions you in a comment" },
  ];

  const assetsList = [
    { key: "yourUploads", title: "Your Uploads", subtitle: "When you upload assets" },
    { key: "otherUserUploads", title: "Other User Uploads", subtitle: "When other users upload assets" },
    { key: "statusUpdates", title: "Status Updates", subtitle: "When someone changes an asset's status" },
    { key: "assigningTask", title: "Assigning Task to you", subtitle: "When someone assigns an asset to you" },
    { key: "transcriptionActivity", title: "Your Transcription Activity", subtitle: "When you transcribe assets" },
  ];

  // central state map for toggles
  const initialToggles = {
    generalComments: false,
    commentReplies: true,
    mentions: false,
    yourUploads: false,
    otherUserUploads: false,
    statusUpdates: false,
    assigningTask: false,
    transcriptionActivity: true,
    emailNotifications: true,
    projectNotifications: false,
  };

  const [toggles, setToggles] = useState(initialToggles);

  function toggle(key) {
    setToggles((t) => ({ ...t, [key]: !t[key] }));
  }

  // Small accessible toggle using input + peer
  function Toggle({ checked, onChange, id }) {
    return (
      <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
          aria-checked={checked}
        />
        <div className="w-11 h-6 bg-white/6 rounded-full peer-checked:bg-emerald-400 transition-colors" />
        <span
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transform transition-transform peer-checked:translate-x-5`}
        />
      </label>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-[#070707] text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/6 pb-4 mb-6">
        <h1 className="text-xl font-semibold">Notifications</h1>
        <Bell size={18} className="text-gray-300" />
      </div>
      <div className="h-1 mt-3 w-full bg-transparent border-t border-[#2F2F2F]" />
      {/* Comments Section */}
      <Section title="Comments">
        <Card>
          <div className="flex flex-col gap-4">
            {commentsList.map((c) => (
              <Row
                key={c.key}
                title={c.title}
                subtitle={c.subtitle}
                right={
                  <Toggle
                    id={`t-${c.key}`}
                    checked={!!toggles[c.key]}
                    onChange={() => toggle(c.key)}
                  />
                }
              />
            ))}
          </div>
        </Card>
      </Section>

      {/* Assets Section */}
      <Section title="Assets">
        <Card>
          <div className="flex flex-col gap-4">
            {assetsList.map((a) => (
              <Row
                key={a.key}
                title={a.title}
                subtitle={a.subtitle}
                right={
                  <Toggle
                    id={`t-${a.key}`}
                    checked={!!toggles[a.key]}
                    onChange={() => toggle(a.key)}
                  />
                }
              />
            ))}
          </div>
        </Card>
      </Section>

      {/* Emails */}
      <Section title="Emails">
        <Card>
          <Row
            title="Email Notifications"
            subtitle={`Email updates will be sent to ${email}`}
            right={
              <Toggle
                id="t-emailNotifications"
                checked={!!toggles.emailNotifications}
                onChange={() => toggle("emailNotifications")}
              />
            }
          />
        </Card>
      </Section>

      {/* Projects */}
      <Section title="Projects">
        <Card>
          <Row
            title="Project Notifications"
            subtitle="You can enable or disable notifications for individual Projects from their Project settings."
            right={
              <Toggle
                id="t-projectNotifications"
                checked={!!toggles.projectNotifications}
                onChange={() => toggle("projectNotifications")}
              />
            }
          />
        </Card>
      </Section>
    </div>
  );
}

/* ----------------- small subcomponents ----------------- */

function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h2 className="text-[18px]  font-poppins-bold mb-3">{title}</h2>
      {children}
    </section>
  );
}

function Card({ children }) {
  return (
    <div className="bg-[#0f0f10] border font-poppins border-white/6 rounded-xl p-4">
      {children}
    </div>
  );
}

function Row({ title, subtitle, right }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-[14px] font-medium">{title}</div>
        {subtitle && <div className="text-xs font-poppins text-gray-400 mt-1">{subtitle}</div>}
      </div>

      <div className="ml-4">{right}</div>
    </div>
  );
}
