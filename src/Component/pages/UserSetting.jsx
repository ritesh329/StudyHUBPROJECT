
import React from "react";

export default function UserSetting() {
  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-5xl mx-auto bg-white/50 rounded-2xl shadow p-6 space-y-6">
        {/* Account */}
        <div className="bg-white/40 p-4 rounded-xl">
          <h2 className="font-semibold mb-3">Account Settings</h2>
          <div className="grid md:grid-cols-2 gap-4 ">
            <input type="password" placeholder="New Password" className="input rounded-xl p-2 bg-white/50" />
            <input type="password" placeholder="Confirm Password" className="input rounded-xl p-2 bg-white/50" />
          </div>
          <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
            Change Password
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-white/40 p-4 rounded-xl">
          <h2 className="font-semibold mb-3">Notifications</h2>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Email Notifications
          </label>
          <label className="flex items-center gap-2 mt-2">
            <input type="checkbox" /> New Content Alerts
          </label>
        </div>

        {/* Appearance */}
        <div className="bg-white/40 p-4 rounded-xl">
          <h2 className="font-semibold mb-3">Appearance</h2>
          <button className="bg-gray-800 text-white px-4 py-2 rounded">
            Toggle Dark Mode
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-white/40 p-4 rounded-xl">
          <h2 className="font-semibold mb-3 text-red-600">Danger Zone</h2>
          <button className="bg-red-600 text-white px-4 py-2 rounded">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}