import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UniversityEducationUI() {
  const [universities, setUniversities] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [university, setUniversity] = useState("");
  const [courseType, setCourseType] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  const navigate = useNavigate();

  /* ================= LOAD UNIVERSITIES ================= */
  useEffect(() => {
    axios.get("https://studyhubapi-e2lb.onrender.com/api/universities/universities")
      .then(res => setUniversities(res.data.data || []))
      .catch(() => console.error("Failed to load universities"));
  }, []);

  /* ================= LOAD COURSE TYPES ================= */
  useEffect(() => {
    if (!university) return;

    setCourseType("");
    setDepartment("");
    setSemester("");
    setDepartments([]);
    setSemesters([]);

    axios.get(
      `https://studyhubapi-e2lb.onrender.com/api/universities/universities/${university}/course-types`
    )
      .then(res => setCourseTypes(res.data.data || []))
      .catch(() => console.error("Failed to load course types"));

  }, [university]);

  /* ================= LOAD DEPARTMENTS ================= */
  useEffect(() => {
    if (!university || !courseType) return;

    setDepartment("");
    setSemester("");
    setSemesters([]);

    axios.get(
      `https://studyhubapi-e2lb.onrender.com/api/universities/universities/${university}/course-types/${courseType}/departments`
    )
      .then(res => setDepartments(res.data.data || []))
      .catch(() => console.error("Failed to load departments"));

  }, [university, courseType]);

  /* ================= LOAD SEMESTERS (NO API CALL) ================= */
  useEffect(() => {
    if (!department) return;

    const selectedDept = departments.find(d => d._id === department);

    setSemesters(selectedDept?.semesters || []);
    setSemester("");

  }, [department, departments]);

  /* ================= HANDLE EXPLORE ================= */
  const handleExplore = () => {
    if (!university || !courseType || !department || !semester) {
      alert("Please select all fields");
      return;
    }

    navigate(
      `/university/${university}/${courseType}/${department}/${semester}`
    );
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/backgroundimg.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-10 text-white">
          University Education
        </h1>

        <div className="max-w-xl mx-auto bg-white/95 backdrop-blur p-6 rounded-2xl shadow-lg space-y-6">

          {/* UNIVERSITY */}
          <select
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="">Select University</option>
            {universities.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>

          {/* COURSE TYPE */}
          <select
            value={courseType}
            onChange={(e) => setCourseType(e.target.value)}
            disabled={!university}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="">Select UG / PG</option>
            {courseTypes.map((ct) => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
          </select>

          {/* DEPARTMENT */}
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            disabled={!courseType}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.name}
              </option>
            ))}
          </select>

          {/* SEMESTER (FROM DEPARTMENT OBJECT) */}
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            disabled={!department || semesters.length === 0}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem._id} value={sem._id}>
                {sem.name}
              </option>
            ))}
          </select>

          {/* EXPLORE */}
          <button
            onClick={handleExplore}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Explore
          </button>

        </div>
      </div>
    </div>
  );
}
