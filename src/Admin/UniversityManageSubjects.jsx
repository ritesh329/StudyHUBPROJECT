import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

/* ================= AXIOS ================= */
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

export default function ManageUniversityNotes() {
  const navigate = useNavigate();

  const [universities, setUniversities] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [notes, setNotes] = useState([]);

  const [universityId, setUniversityId] = useState("");
  const [courseType, setCourseType] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [semesterId, setSemesterId] = useState("");

  const [loading, setLoading] = useState(false);

  /* ================= LOAD UNIVERSITIES ================= */
  useEffect(() => {
    api.get("/universities/universities")
      .then(res => setUniversities(res.data.data || []))
      .catch(() => toast.error("Failed to load universities"));
  }, []);

  /* ================= LOAD COURSE TYPES ================= */
  useEffect(() => {
    if (!universityId) return;

    setCourseType("");
    setDepartmentId("");
    setSemesterId("");
    setDepartments([]);
    setSemesters([]);
    setNotes([]);

    api.get(`/universities/universities/${universityId}/course-types`)
      .then(res => setCourseTypes(res.data.data || []))
      .catch(() => toast.error("Failed to load course types"));
  }, [universityId]);

  /* ================= LOAD DEPARTMENTS ================= */
  useEffect(() => {
    if (!universityId || !courseType) return;

    setDepartmentId("");
    setSemesterId("");
    setSemesters([]);
    setNotes([]);

    api.get(
      `/universities/universities/${universityId}/course-types/${courseType}/departments`
    )
      .then(res => setDepartments(res.data.data || []))
      .catch(() => toast.error("Failed to load departments"));
  }, [universityId, courseType]);

  /* ================= LOAD SEMESTERS (NO EXTRA API CALL) ================= */
  useEffect(() => {
    if (!departmentId) return;

    const selectedDept = departments.find(d => d._id === departmentId);
    setSemesters(selectedDept?.semesters || []);
    setSemesterId("");
    setNotes([]);
  }, [departmentId, departments]);

  /* ================= LOAD NOTES ================= */
  useEffect(() => {
    if (!universityId || !courseType || !departmentId || !semesterId) return;
    fetchNotes();
  }, [universityId, courseType, departmentId, semesterId]);

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/university-notes?university=${universityId}&courseType=${courseType}&department=${departmentId}&semester=${semesterId}`
      );

      setNotes(res.data.data || []);
    } catch {
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await api.delete(`/university-notes/${id}`);
      toast.success("Note deleted successfully");
      setNotes(prev => prev.filter(n => n._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">

      <h2 className="text-2xl font-bold text-purple-700 mb-6">
        Manage University Notes
      </h2>

      {/* ================= FILTER SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        {/* UNIVERSITY */}
        <select
          value={universityId}
          onChange={(e) => setUniversityId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select University</option>
          {universities.map(u => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>

        {/* COURSE TYPE */}
        <select
          value={courseType}
          onChange={(e) => setCourseType(e.target.value)}
          disabled={!universityId}
          className="border p-2 rounded"
        >
          <option value="">Course Type</option>
          {courseTypes.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* DEPARTMENT */}
        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          disabled={!courseType}
          className="border p-2 rounded"
        >
          <option value="">Select Department</option>
          {departments.map(d => (
            <option key={d._id} value={d._id}>{d.name}</option>
          ))}
        </select>

        {/* SEMESTER */}
        <select
          value={semesterId}
          onChange={(e) => setSemesterId(e.target.value)}
          disabled={!departmentId || semesters.length === 0}
          className="border p-2 rounded"
        >
          <option value="">Select Semester</option>
          {semesters.map(s => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* ================= NOTES SECTION ================= */}
      {!universityId || !courseType || !departmentId || !semesterId ? (
        <p className="text-gray-500">
          Please select University, Course Type, Department and Semester
        </p>
      ) : loading ? (
        <p className="text-purple-600">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-gray-500">No notes found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Actions</th>
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
    console.log("Edit data sent to form:", n) ||
    navigate(`/admin/university/course`, {
      state: {
        editData: n,   // pura note object bhej diya
        isEdit: true
      },
    })
  }
  className="bg-purple-600 text-white px-3 py-1 rounded text-sm"
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
