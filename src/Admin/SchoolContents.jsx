import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

export default function SchoolNotes() {

  const navigate = useNavigate();
  const location = useLocation();

  const editData = location.state?.note;
  const isEdit = editData?._id;

  const [boards, setBoards] = useState([]);
  const [classes, setClasses] = useState([]);

  const [boardId, setBoardId] = useState("");
  const [classId, setClassId] = useState("");
  const [subject, setSubject] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  /* ================= LOAD BOARDS ================= */
  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const res = await api.get("/boards/boards");
      setBoards(res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= LOAD CLASSES ================= */
  useEffect(() => {
    if (!boardId) return;
    fetchClasses(boardId);
  }, [boardId]);

  const fetchClasses = async (id) => {
    try {
      const res = await api.get(`/boards/boards/${id}/classes`);
      setClasses(res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= PREFILL EDIT ================= */
  useEffect(() => {

    if (isEdit && editData) {

      setBoardId(editData.board?._id);
      setClassId(editData.class?._id);
      setSubject(editData.subject);
      setTitle(editData.title);
      setAuthor(editData.author || "");
      setTags(editData.tags?.join(", ") || "");
      setIsPublic(editData.isPublic);

      setContent(editData.content || "");

    }

  }, [editData]);

  /* ================= SAVE / UPDATE ================= */
  const handleSubmit = async () => {

    const html = content;

    if (!boardId || !classId || !subject || !title) {
      alert("All fields required");
      return;
    }

    if (!html || html === "<p></p>") {
      alert("Content required");
      return;
    }

    const payload = {
      board: boardId,
      class: classId,
      subject,
      title,
      author,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      isPublic,
      content: html,
    };

    try {

      setLoading(true);

      if (isEdit) {
        await api.put(`/school-notes/${isEdit}`, payload);
        toast.success("✅ Note updated successfully");
      } else {
        await api.post("/school-notes", payload);
        toast.success("✅ School note saved successfully");
      }

      navigate("/admin/manage-school-notes");

    } catch {
      alert("❌ Operation failed");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="max-w mx-auto p-6 bg-gray-50">
      <div className="bg-white rounded shadow p-6 space-y-6">

        <h2 className="text-2xl font-bold text-gray-800">
          {isEdit ? "✏ Edit School Note" : "📘 Add School Notes"}
        </h2>

        {/* BOARD + CLASS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <select
            className="border p-2 rounded"
            value={boardId}
            onChange={(e) => {
              setBoardId(e.target.value);
              setClassId("");
              setSubject("");
              setClasses([]);
            }}
          >
            <option value="">Select Board</option>
            {boards.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded"
            value={classId}
            disabled={!boardId}
            onChange={(e) => setClassId(e.target.value)}
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.className}
              </option>
            ))}
          </select>

          <input
            className="border p-2 rounded"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

        </div>

        {/* META */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            className="border p-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

        </div>

        <input
          className="border p-2 rounded w-full"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <label className="flex gap-2 items-center text-sm">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          Make Public
        </label>

        {/* EDITOR */}
        <div className="border rounded min-h-[300px]">

          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />

        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-4 py-3 rounded w-full text-lg text-white ${
            isEdit
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading
            ? isEdit
              ? "Updating..."
              : "Saving..."
            : isEdit
            ? "Update Note"
            : "💾 Save School Notes"}
        </button>

      </div>
    </div>
  );
}