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

  return (
    <div className="space-y-6">

      {/* ================= GRAND TOTAL ================= */}
      <div className="bg-purple-100 p-4 rounded-xl shadow">
        <div className="text-sm">Grand Total Notes</div>
        <div className="text-2xl font-bold">
          {countLoading ? "..." : counts?.grandTotal}
        </div>
      </div>

      {/* ================= SCHOOL NOTES ================= */}
      <div className="grid grid-cols-4 gap-4">
        <Stat title="School Total" value={countLoading ? "..." : counts?.schoolNotes?.total} bg="bg-blue-100"/>
        <Stat title="School Published" value={countLoading ? "..." : counts?.schoolNotes?.published} bg="bg-green-100"/>
        <Stat title="School Unpublished" value={countLoading ? "..." : counts?.schoolNotes?.unpublished} bg="bg-yellow-100"/>
        <Stat title="School Deleted" value={countLoading ? "..." : counts?.schoolNotes?.deleted} bg="bg-red-100"/>
      </div>

      {/* ================= TOPICS ================= */}
      <div className="grid grid-cols-4 gap-4">
        <Stat title="Topic Total" value={countLoading ? "..." : counts?.topics?.total} bg="bg-indigo-100"/>
        <Stat title="Topic Published" value={countLoading ? "..." : counts?.topics?.published} bg="bg-green-100"/>
        <Stat title="Topic Unpublished" value={countLoading ? "..." : counts?.topics?.unpublished} bg="bg-yellow-100"/>
        <Stat title="Topic Deleted" value={countLoading ? "..." : counts?.topics?.deleted} bg="bg-red-100"/>
      </div>

      {/* ================= UNIVERSITY NOTES ================= */}
      <div className="grid grid-cols-4 gap-4">
        <Stat title="University Total" value={countLoading ? "..." : counts?.universityNotes?.total} bg="bg-pink-100"/>
        <Stat title="University Published" value={countLoading ? "..." : counts?.universityNotes?.published} bg="bg-green-100"/>
        <Stat title="University Unpublished" value={countLoading ? "..." : counts?.universityNotes?.unpublished} bg="bg-yellow-100"/>
        <Stat title="University Deleted" value={countLoading ? "..." : counts?.universityNotes?.deleted} bg="bg-red-100"/>
      </div>

      {/* ================= USERS TABLE ================= */}
      <div className="bg-white/50 backdrop-blur rounded-xl p-4 shadow">
        <h2 className="font-bold mb-3">Latest Users</h2>

        {userLoading ? (
          <p>Loading users...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Created</th>
                <th className="text-left py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No Users Found
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="border-b">
                    <td className="py-2">{u.name}</td>
                    <td className="py-2">{u.email}</td>
                    <td className="py-2">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

/* ================= STAT CARD ================= */

function Stat({ title, value, bg }) {
  return (
    <div className={`${bg} p-4 rounded-xl shadow`}>
      <div className="text-sm">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}