import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function Dashboard() {

  /* ================= DASHBOARD COUNT STATE ================= */
  const [counts, setCounts] = useState(null);
  const [countLoading, setCountLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);

  const USER_URL = "https://studyhubapi-e2lb.onrender.com/api/allUsers/users";
  const DASHBOARD_URL = "https://studyhubapi-e2lb.onrender.com/api/countAll/counts";

  /* ================= FETCH DASHBOARD COUNT ================= */

  const fetchCounts = useCallback(async () => {
    try {
      setCountLoading(true);
      const res = await axios.get(DASHBOARD_URL);
      setCounts(res.data);
      setCountLoading(false);
    } catch (error) {
      console.error("Count fetch error:", error);
      setCountLoading(false);
    }
  }, []);

  /* ================= FETCH USERS ================= */

  const fetchUsers = useCallback(async () => {
    try {
      setUserLoading(true);
      const res = await axios.get(USER_URL);
      setUsers(res.data.data || []);
      setUserLoading(false);
    } catch (error) {
      console.error("User fetch error:", error);
      setUserLoading(false);
    }
  }, []);

  /* ================= DELETE USER ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${USER_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchCounts();
    fetchUsers();
  }, [fetchCounts, fetchUsers]);

  // Detect theme from body class
  const isDarkMode = document.body.classList.contains('dark');

  return (
    <div className="space-y-6">

      {/* ================= GRAND TOTAL ================= */}
      <div className={`
        p-4 rounded-xl shadow transition-all duration-300
        ${isDarkMode 
          ? 'bg-gradient-to-r from-purple-900/80 to-purple-800/80 backdrop-blur-sm border border-purple-500/30' 
          : 'bg-purple-100'
        }
      `}>
        <div className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-gray-600'}`}>
          Grand Total Notes
        </div>
        <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {countLoading ? "..." : counts?.grandTotal}
        </div>
      </div>

      {/* ================= SCHOOL NOTES ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat 
          title="School Total" 
          value={countLoading ? "..." : counts?.schoolNotes?.total} 
          color="blue"
          isDarkMode={isDarkMode}
        />
        <Stat 
          title="School Published" 
          value={countLoading ? "..." : counts?.schoolNotes?.published} 
          color="green"
          isDarkMode={isDarkMode}
        />
        <Stat 
          title="School Unpublished" 
          value={countLoading ? "..." : counts?.schoolNotes?.unpublished} 
          color="yellow"
          isDarkMode={isDarkMode}
        />
        <Stat 
          title="School Deleted" 
          value={countLoading ? "..." : counts?.schoolNotes?.deleted} 
          color="red"
          isDarkMode={isDarkMode}
        />
      </div>

      {/* ================= TOPICS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat 
          title="Topic Total" 
          value={countLoading ? "..." : counts?.topics?.total} 
          color="indigo"
          isDarkMode={isDarkMode}
        />
        <Stat 
          title="Topic Published" 
          value={countLoading ? "..." : counts?.topics?.published} 
          color="green"
          isDarkMode={isDarkMode}
        />
        <Stat 
          title="Topic Unpublished" 
          value={countLoading ? "..." : counts?.topics?.unpublished} 
          color="yellow"
          isDarkMode={isDarkMode}
        />
        <Stat 
          title="Topic Deleted" 
          value={countLoading ? "..." : counts?.topics?.deleted} 
          color="red"
          isDarkMode={isDarkMode}
        />
      </div>

      {/* ================= UNIVERSITY NOTES ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat 
          title="University Total" 
          value={countLoading ? "..." : counts?.universityNotes?.total} 
          color="pink"
          isDarkMode={isDarkMode}
        />
        <Stat 
          title="University Published" 
          value={countLoading ? "..." : counts?.universityNotes?.published} 
          color="green"
          isDarkMode={isDarkMode}
        />
        <Stat 
          title="University Unpublished" 
          value={countLoading ? "..." : counts?.universityNotes?.unpublished} 
          color="yellow"
          isDarkMode={isDarkMode}
        />
        <Stat 
          title="University Deleted" 
          value={countLoading ? "..." : counts?.universityNotes?.deleted} 
          color="red"
          isDarkMode={isDarkMode}
        />
      </div>

      {/* ================= USERS TABLE ================= */}
      <div className={`
        backdrop-blur rounded-xl p-4 shadow transition-all duration-300
        ${isDarkMode 
          ? 'bg-gray-800/80 border border-gray-700' 
          : 'bg-white/50'
        }
      `}>
        <h2 className={`font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Latest Users
        </h2>

        {userLoading ? (
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <tr>
                  <th className={`text-left py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Name</th>
                  <th className={`text-left py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Email</th>
                  <th className={`text-left py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Created</th>
                  <th className={`text-left py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className={`text-center py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      No Users Found
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u._id} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                      <td className={`py-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{u.name}</td>
                      <td className={`py-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{u.email}</td>
                      <td className={`py-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2">
                        <button
                          onClick={() => handleDelete(u._id)}
                          className={`
                            px-3 py-1 rounded transition-all duration-300
                            ${isDarkMode 
                              ? 'bg-red-600 hover:bg-red-700 text-white' 
                              : 'bg-red-500 hover:bg-red-600 text-white'
                            }
                          `}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

/* ================= STAT CARD ================= */

function Stat({ title, value, color, isDarkMode }) {
  // Color mapping for light and dark modes
  const colorClasses = {
    blue: {
      light: 'bg-blue-100',
      dark: 'bg-blue-900/40 border border-blue-500/30',
      textLight: 'text-gray-600',
      textDark: 'text-blue-200',
      valueLight: 'text-gray-800',
      valueDark: 'text-white'
    },
    green: {
      light: 'bg-green-100',
      dark: 'bg-green-900/40 border border-green-500/30',
      textLight: 'text-gray-600',
      textDark: 'text-green-200',
      valueLight: 'text-gray-800',
      valueDark: 'text-white'
    },
    yellow: {
      light: 'bg-yellow-100',
      dark: 'bg-yellow-900/40 border border-yellow-500/30',
      textLight: 'text-gray-600',
      textDark: 'text-yellow-200',
      valueLight: 'text-gray-800',
      valueDark: 'text-white'
    },
    red: {
      light: 'bg-red-100',
      dark: 'bg-red-900/40 border border-red-500/30',
      textLight: 'text-gray-600',
      textDark: 'text-red-200',
      valueLight: 'text-gray-800',
      valueDark: 'text-white'
    },
    indigo: {
      light: 'bg-indigo-100',
      dark: 'bg-indigo-900/40 border border-indigo-500/30',
      textLight: 'text-gray-600',
      textDark: 'text-indigo-200',
      valueLight: 'text-gray-800',
      valueDark: 'text-white'
    },
    pink: {
      light: 'bg-pink-100',
      dark: 'bg-pink-900/40 border border-pink-500/30',
      textLight: 'text-gray-600',
      textDark: 'text-pink-200',
      valueLight: 'text-gray-800',
      valueDark: 'text-white'
    }
  };

  const classes = colorClasses[color] || colorClasses.blue;
  
  return (
    <div className={`
      p-4 rounded-xl shadow transition-all duration-300
      ${isDarkMode ? classes.dark : classes.light}
      hover:scale-105 transform transition-transform duration-300
    `}>
      <div className={`text-sm ${isDarkMode ? classes.textDark : classes.textLight}`}>
        {title}
      </div>
      <div className={`text-xl font-bold ${isDarkMode ? classes.valueDark : classes.valueLight}`}>
        {value}
      </div>
    </div>
  );
}