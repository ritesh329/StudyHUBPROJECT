import React from "react";
import { useSelector } from "react-redux";

export default function AdminNavbar({ setOpen }) {

  const { admin } = useSelector((state) => state.admin);
  const firstChar = admin?.email?.charAt(0).toUpperCase() || "A";

  return (
    <header
      className="bg-white/90 backdrop-blur
                 m-4 px-6 py-3
                 rounded-2xl shadow
                 flex justify-between items-center"
    >
      {/* LEFT SIDE */}
      <div className="flex items-center">
        <button
          className="md:hidden text-2xl mr-3"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

        <h1 className="text-lg font-semibold md:hidden">
          Studyhubnotes
        </h1>
      </div>

      {/* RIGHT SIDE - ADMIN AVATAR */}
      <div className="flex items-center gap-2 bg-blue-600 text-white px-2 py-2 rounded-full">
        
        <div
          className="w-8 h-8 rounded-full bg-white text-blue-600
                     flex items-center justify-center font-bold uppercase border"
        >
          {firstChar}
        </div>

      </div>
    </header>
  );
}