import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="h-screen flex "
      style={{
        backgroundImage: "url('/images/AdminBackgroundimage.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ✅ Sidebar (LEFT) */}
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* ✅ RIGHT SIDE (Navbar + Content) */}
      <div className="flex-1 flex flex-col ">

        {/* ✅ Navbar (TOP, after sidebar) */}
        <AdminNavbar setOpen={setOpen} />

        {/* ✅ Content */}
        <main className="flex-1 p-6 overflow-y-auto backdrop-blur-[1px] bg-white/10">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
