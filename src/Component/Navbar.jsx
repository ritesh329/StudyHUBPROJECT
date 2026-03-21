import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NevLogo from "./NevLogo";
import { isUser } from "../utils/auth";
import useGetUserById from "../hooks/useGetUserById";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
export default function Navbar() {
   const { theme, toggleTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();

  const { user } = useGetUserById();
  const isLoggedIn = isUser();

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
       // mobile menu close
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);

  }, [open]);

 useEffect(() => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}, [open]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      console.log("Searching:", searchQuery);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setProfileOpen(false);
    navigate("/login");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value) {
      navigate(value);
      setOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-700 to-indigo-600 shadow-lg z-50">

      <div className="w-full flex items-center justify-between h-[80px] px-4 md:px-6 lg:px-8 ">

        {/*================LEFT SIDE===================*/}
        <div className="flex items-center gap-2">

          {/*===========MOBILE BURGER==================*/}
          <button
            onClick={() => setOpen(!open)}
            className="text-white text-xl  md:hidden"
          >
            {open ? "✕" : "☰"}
          </button>

          {/*=================LOGO=====================*/}
          <div className="flex items-center gap-2">
            <NevLogo />
            <span className="text-white font-semibold text-xx tracking-wide">
              StudyHub<span className="text-yellow-300">Note</span>
            </span>
          </div>

        </div>

        {/*========================CENTER LINKS (DESKTOP)====================*/}
        <div className="hidden md:flex  items-center space-x-6 font-medium">

          <Link to="/" className="hover:text-yellow-300">Home</Link>

          <select
            onChange={handleChange}
            className="bg-transparent outline-none cursor-pointer hover:text-yellow-300"
          >
            <option value="" className="text-black">Notes</option>
            <option value="/school" className="text-black">School</option>
            <option value="/college" className="text-black" >University</option>
            <option value="/Itcourse" className="text-black" >ItCourse</option>
          </select>

          <Link to="/resources" className="hover:text-yellow-300">StudyResource</Link>
          <Link to ="/UserNews" className="hover:text-yellow-300">News</Link>

        </div>

        {/*============================RIGHT SIDE===============================*/}
        <div className="flex items-center space-x-4">


  <button
    onClick={toggleTheme}
    className="bg-yellow-300 text-black px-3 py-1 rounded-full font-semibold"
  >
    {theme === "light" ? "🌙" : "☀️"}
  </button>
          {/*=========================SEARCH====================================*/}
          <form onSubmit={handleSearch} className="relative hidden md:block">


  
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="py-2 px-4 pl-10 rounded-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 w-64"
            />

            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
              🔍
            </span>

          </form>

          {/*=============================PROFILE / LOGIN==========================*/}
          <div className="relative" ref={profileRef}>

            {!isLoggedIn ? (

              <div className="flex items-center gap-2">

                <Link
                  to="/login"
                  onClick={() => window.scrollTo(0, 0)}
                  className="bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold hover:bg-yellow-300"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => window.scrollTo(0, 0)}
                  className="bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold hover:bg-yellow-300"
                >
                  Sign Up
                </Link>

              </div>

            ) : (

              <>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2"
                >
                  <div id="Profile" className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <span className="text-white hidden lg:inline">
                    {user?.name || "User"}
                  </span>

                </button>

                {profileOpen && (

                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border">

                    <Link
                      to="/userProfile"
                      onClick={() => {setProfileOpen(false);
                        window.scrollTo(0, 0);
                      }}
                      className="block px-4 py-2 text-sm hover:bg-blue-50"
                    >
                      👤 View Profile
                    </Link>

                    <Link
                      to="/userSettings"
                      onClick={() => {setProfileOpen(false);
                        window.scrollTo(0, 0);
                      }}
                      className="block px-4 py-2 text-sm hover:bg-blue-50"
                    >
                      ⚙️ Settings
                    </Link>

                    <div className="border-t my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      🚪 Logout
                    </button>

                  </div>

                )}
              </>

            )}

          </div>

        </div>

      </div>

      {/*=====================MOBILE MENU===============================*/}
      {open && (

      <div
  ref={menuRef}
  className={`md:hidden fixed  left-0 w-full bg-blue-500 text-white z-50 shadow-lg transform transition-transform duration-300 ${
    open ? "translate-y-0" : "-translate-y-full"
  }`}
>
  <div className="p-6 flex flex-col space-y-6">
    {/* Home Link */}
    <Link
      to="/"
      onClick={() => {
        setOpen(false);
        window.scrollTo(0, 0);
      }}
      className="block px-4 py-2 rounded hover:bg-yellow-300 hover:text-blue-800 transition-colors duration-200 font-medium"
    >
      Home
    </Link>

    {/* Notes Dropdown */}
    <select
      onChange={(e) => {
        handleChange(e);
        window.scrollTo(0, 0);
      }}
      className="bg-blue-500 px-4 py-2 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
    >
      <option value="">Notes</option>
      <option value="/school">School</option>
      <option value="/college">University</option>
      <option value="/Itcourse">ItCourse</option>
    </select>

    {/* Study Resource Link */}
    <Link
      to="/resources"
      onClick={() => {
        setOpen(false);
        window.scrollTo(0, 0);
      }}
      className="block px-4 py-2 rounded hover:bg-yellow-300 hover:text-blue-800 transition-colors duration-200 font-medium"
    >
      Study Resource
    </Link>

    {/* News Link */}
    <Link
      to="/UserNews"
      onClick={() => {
        setOpen(false);
        window.scrollTo(0, 0);
      }}
      className="block px-4 py-2 rounded hover:bg-yellow-300 hover:text-blue-800 transition-colors duration-200 font-medium"
    >
      News
    </Link>
  </div>
</div>
      )}

    </nav>
  );
}