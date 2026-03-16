import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CKEditorComponent from "./CKEditor";

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

export default function UniversityContent() {

  const navigate = useNavigate();
  const location = useLocation();

  const editData = location.state?.editData;
  const isEdit = location.state?.isEdit || false;

  /* ================= STATES ================= */

  const [universities, setUniversities] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [universityId, setUniversityId] = useState("");
  const [courseType, setCourseType] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [subject, setSubject] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);

  const [content, setContent] = useState("");

  /* ================= SAFETY CHECK ================= */

  useEffect(() => {
    if (isEdit && !editData) {
      navigate("/admin/university/subjects");
    }
  }, [isEdit, editData, navigate]);

  /* ================= LOAD UNIVERSITIES ================= */

  useEffect(() => {
    api.get("/universities/universities")
      .then(res => setUniversities(res.data.data || []))
      .catch(() => toast.error("Failed to load universities"));
  }, []);

  /* ================= LOAD COURSE TYPES ================= */

  useEffect(() => {

    if (!universityId || isEdit) return;

    setCourseType("");
    setDepartmentId("");
    setSemesterId("");

    setDepartments([]);
    setSemesters([]);

    api.get(`/universities/universities/${universityId}/course-types`)
      .then(res => setCourseTypes(res.data.data || []))
      .catch(() => toast.error("Failed to load course types"));

  }, [universityId, isEdit]);

  /* ================= LOAD DEPARTMENTS ================= */

  useEffect(() => {

    if (!universityId || !courseType || isEdit) return;

    setDepartmentId("");
    setSemesterId("");
    setSemesters([]);

    api.get(`/universities/universities/${universityId}/course-types/${courseType}/departments`)
      .then(res => setDepartments(res.data.data || []))
      .catch(() => toast.error("Failed to load departments"));

  }, [universityId, courseType, isEdit]);

  /* ================= LOAD SEMESTERS ================= */

  useEffect(() => {

    if (!departmentId) return;

    const selectedDept = departments.find(d => d._id === departmentId);

    setSemesterId("");
    setSemesters(selectedDept?.semesters || []);

  }, [departmentId, departments]);

  /* ================= EDIT MODE PREFILL ================= */

  useEffect(() => {

    if (!isEdit || !editData) return;

    const loadEditData = async () => {

      try {

        setUniversityId(editData.university);
        setCourseType(editData.courseType);
        setDepartmentId(editData.department);
        setSemesterId(editData.semester);

        setSubject(editData.subject || "");
        setTitle(editData.title || "");
        setAuthor(editData.author || "");
        setTags(editData.tags?.join(", ") || "");
        setIsPublic(editData.isPublic || false);

        setContent(editData.content || "");

        const courseRes = await api.get(
          `/universities/universities/${editData.university}/course-types`
        );

        setCourseTypes(courseRes.data.data || []);

        const deptRes = await api.get(
          `/universities/universities/${editData.university}/course-types/${editData.courseType}/departments`
        );

        const deptList = deptRes.data.data || [];

        setDepartments(deptList);

        const selectedDept = deptList.find(
          d => d._id === editData.department
        );

        setSemesters(selectedDept?.semesters || []);

      } catch (error) {

        console.error(error);
        toast.error("Failed to load edit data");

      }

    };

    loadEditData();

  }, [isEdit, editData]);

  /* ================= SAVE / UPDATE ================= */

  const handleSave = async () => {

    const html = content;

    if (
      !universityId ||
      !courseType ||
      !departmentId ||
      !semesterId ||
      !subject ||
      !title
    ) {

      toast.error("All fields required");
      return;

    }

    if (!html || html === "<p></p>") {

      toast.error("Content required");
      return;

    }

    const payload = {

      university: universityId,
      courseType,
      department: departmentId,
      semester: semesterId,
      subject,
      title,
      author,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      isPublic,
      content: html,

    };

    try {

      setLoading(true);

      if (isEdit) {

        await api.put(`/university-notes/${editData._id}`, payload);
        toast.success("Note updated successfully");

      } else {

        await api.post("/university-notes", payload);
        toast.success("Note created successfully");

      }

      navigate("/admin/university/subjects");

    } catch {

      toast.error("Operation failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w mx-auto p-6 bg-white shadow rounded space-y-4">

      <h2 className="text-2xl font-bold">
        {isEdit ? "Edit University Note" : "Add University Note"}
      </h2>

      <div className="grid grid-cols-5 gap-4">

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

        <select
          value={semesterId}
          onChange={(e) => setSemesterId(e.target.value)}
          disabled={!departmentId}
          className="border p-2 rounded"
        >
          <option value="">Select Semester</option>
          {semesters.map(s => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>

        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 rounded"
        />

      </div>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <input
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <label className="flex gap-2 items-center">

        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />

        Make Public

      </label>

      <div className="border rounded min-h-[300px]">

        <CKEditorComponent
          content={content}
          setContent={setContent}
        />

      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Saving..." : isEdit ? "Update Note" : "Save Note"}
      </button>

    </div>

  );

}