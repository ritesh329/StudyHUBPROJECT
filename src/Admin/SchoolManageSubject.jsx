import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* =======================
   AXIOS INSTANCE
======================= */
const api = axios.create({
  baseURL: "https://studyhubapi-e2lb.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function ManageSchoolNotes() {
  const navigate = useNavigate();

  const [boards, setBoards] = useState([]);
  const [classes, setClasses] = useState([]);
  const [notes, setNotes] = useState([]);

  const [boardId, setBoardId] = useState("");
  const [classId, setClassId] = useState("");
  const [subject, setSubject] = useState("");

  const [loading, setLoading] = useState(false);

  /* =====================
     LOAD BOARDS
  ===================== */
  useEffect(() => {
    api
      .get("/boards/boards")
      .then((res) => setBoards(res.data.data))
      .catch(console.error);
  }, []);

  /* =====================
     LOAD CLASSES
  ===================== */
  useEffect(() => {
    if (!boardId) return;

    api
      .get(`/boards/boards/${boardId}/classes`)
      .then((res) => setClasses(res.data.data))
      .catch(console.error);
  }, [boardId]);

  /* =====================
     LOAD NOTES
  ===================== */
  useEffect(() => {
    if (!boardId || !classId ) return;

    setLoading(true);

    api
      .get(
        `/school-notes?board=${boardId}&class=${classId}&subject=${subject}`
      )
      .then((res) => {
        setNotes(res.data.data); // ✅ Correct response handling
      })
      .catch(() => alert("❌ Notes fetch failed"))
      .finally(() => setLoading(false));
  }, [boardId, classId, subject]);

  /* =====================
     DELETE NOTE
  ===================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await api.delete(`/school-notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch {
      alert("❌ Delete failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Manage School Notes
      </h2>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        {/* BOARD */}
        <select
          value={boardId}
          onChange={(e) => {
            setBoardId(e.target.value);
            setClassId("");
            setSubject("");
            setNotes([]);
          }}
          className="border p-2 rounded"
        >
          <option value="">Select Board</option>
          {boards.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>

        {/* CLASS */}
        <select
          value={classId}
          disabled={!boardId}
          onChange={(e) => {
            setClassId(e.target.value);
            setSubject("");
            setNotes([]);
          }}
          className="border p-2 rounded"
        >
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c._id} value={c._id}>
              {c.className}
            </option>
          ))}
        </select>

        {/* SUBJECT */}
        {/* <input
          className="border p-2 rounded"
          placeholder="Subject"
          value={subject}
          disabled={!classId}
          onChange={(e) => setSubject(e.target.value)}
        /> */}
      </div>

      {/* TABLE */}
      {!boardId || !classId ? (
        <p className="text-gray-500">
          Please select Board, Class and Subject
        </p>
      ) : loading ? (
        <p className="text-blue-600">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-gray-500">No notes found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Title</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((n, i) => (
                <tr key={n._id} className="border-t">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-medium">{n.title}</td>
                  <td className="p-3">{n.subject}</td>
                  <td className="p-3 space-x-2">
                    <button
  onClick={() =>
    navigate(`/admin/createcontent`, {
      state: { note: n }
    })
  }
  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
>
  Edit
</button>

                    <button
                      onClick={() => handleDelete(n._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
