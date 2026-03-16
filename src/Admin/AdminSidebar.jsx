import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function AdminSidebar({ open, setOpen }) {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {

     const html = document.documentElement;

    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
        setDarkMode(!darkMode);
  };

  const linkClass =
    "block px-4 py-2 rounded-lg hover:bg-blue-700 transition";

  const activeClass = "bg-blue-700 font-semibold";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static z-50
          w-64 mt-4 rounded-tr-[45px]
          bg-gradient-to-b from-slate-900 to-blue-900
          text-white p-4
          flex flex-col h-screen
          transform transition
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* LOGO */}
        <div className="text-xl font-bold mb-6">
          Studyhubnotes
        </div>

        {/* MENU */}
        <nav className="space-y-2">

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
            onClick={() => setOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
            onClick={() => setOpen(false)}
          >
            Users
          </NavLink>

          <NavLink
            to="/admin/school"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
            onClick={() => setOpen(false)}
          >
            School Education
          </NavLink>

          <NavLink
            to="/admin/university"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
            onClick={() => setOpen(false)}
          >
            University
          </NavLink>

          <NavLink
            to="/admin/it"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
            onClick={() => setOpen(false)}
          >
            IT Courses
          </NavLink>

          <NavLink
            to="/admin/news"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
            onClick={() => setOpen(false)}
          >
            News
          </NavLink>

          <NavLink
            to="/admin/delete"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
            onClick={() => setOpen(false)}
          >
            Delete Content
          </NavLink>

        </nav>

        {/*===================BOTTOM SECTION=====================*/}
        <div className="mt-auto pt-4 border-t border-white/20 space-y-4">

          {/*===================DARK MODE TOGGLE===============================*/}
          <div className="flex items-center justify-between px-2">
            <span>Dark Mode</span>

            <button
              onClick={toggleDarkMode}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition
              ${darkMode ? "bg-blue-600" : "bg-gray-400"}`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition
                ${darkMode ? "translate-x-6" : "translate-x-0"}`}
              />
            </button>
          </div>

          {/* PROFILE */}
          <button className="w-full text-left px-3 py-2 rounded hover:bg-white/10">
            Profile
          </button>

          {/* LOGOUT */}
          <button className="w-full text-left px-3 py-2 rounded text-red-400 hover:bg-red-500/20">
            Logout
          </button>

        </div>
      </aside>
    </>
  );
}