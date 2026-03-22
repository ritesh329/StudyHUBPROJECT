import React from "react";
export default function UserProfile() {
  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-5xl mx-auto bg-white/60 rounded-2xl shadow p-6 grid md:grid-cols-3 gap-6">
        {/* Left */}
        <div className="bg-white/20 p-4 rounded-xl text-center">
          <img
            src="/images/profile-placeholder.png"
            className="w-28 h-28 rounded-full mx-auto mb-3 border-4 border-blue-500"
          />
          <h2 className="text-xl font-semibold">User Name</h2>
          <p className="text-gray-500">Student</p>
          <button className="mt-3 bg-blue-600 text-white px-4 py-1 rounded">
            Change Photo
          </button>
        </div>

        {/* Right */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid md:grid-cols-2 gap-4 bg-white/50 p-4 rounded-xl">
            <input placeholder="Full Name" className="input bg-white/30 border-2 border-black p-2" />
            <input placeholder="Email" className="input bg-white/30 border-2 border-black p-2" />
            <input placeholder="Mobile" className="input bg-white/30 border-2 border-black p-2" />
            <input placeholder="College" className="input bg-white/30 border-2 border-black p-2" />
            <input placeholder="Course" className="input bg-white/30 border-2 border-black p-2" />
            <input placeholder="Semester" className="input bg-white/30 border-2 border-black p-2" />
          </div>

          <textarea
            placeholder="Bio"
            className="input w-full h-24 bg-white/30 border-2 border-black"
          ></textarea>

          <button className="bg-green-600 text-white px-6 py-2 rounded">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}