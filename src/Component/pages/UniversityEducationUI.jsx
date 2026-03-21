import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomDropdown from "../CustomDropdown"; // path check kar lena

export default function UniversityEducationUI() {
  const [universities, setUniversities] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [university, setUniversity] = useState("");
  const [courseType, setCourseType] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  // 🔥 loading states
  const [uniLoading, setUniLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);
  const [deptLoading, setDeptLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= LOAD UNIVERSITIES ================= */
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setUniLoading(true);

        const res = await axios.get(
          "https://studyhubapi-e2lb.onrender.com/api/universities/universities"
        );

        setUniversities(res.data.data || []);
      } catch {
        console.error("Failed to load universities");
      } finally {
        setUniLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  /* ================= LOAD COURSE TYPES ================= */
  useEffect(() => {
    if (!university) return;

    const fetchCourseTypes = async () => {
      try {
        setCourseLoading(true);

        setCourseType("");
        setDepartment("");
        setSemester("");
        setDepartments([]);
        setSemesters([]);

        const res = await axios.get(
          `https://studyhubapi-e2lb.onrender.com/api/universities/universities/${university}/course-types`
        );

        setCourseTypes(res.data.data || []);
      } catch {
        console.error("Failed to load course types");
      } finally {
        setCourseLoading(false);
      }
    };

    fetchCourseTypes();
  }, [university]);

  /* ================= LOAD DEPARTMENTS ================= */
  useEffect(() => {
    if (!university || !courseType) return;

    const fetchDepartments = async () => {
      try {
        setDeptLoading(true);

        setDepartment("");
        setSemester("");
        setSemesters([]);

        const res = await axios.get(
          `https://studyhubapi-e2lb.onrender.com/api/universities/universities/${university}/course-types/${courseType}/departments`
        );

        setDepartments(res.data.data || []);
      } catch {
        console.error("Failed to load departments");
      } finally {
        setDeptLoading(false);
      }
    };

    fetchDepartments();
  }, [university, courseType]);

  /* ================= LOAD SEMESTERS ================= */
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
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative">
      <div className="relative z-10 px-4 py-12">

        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6">

          {/* ✅ UNIVERSITY */}
          <CustomDropdown
            loading={uniLoading}
            options={universities}
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            labelKey="name"
            valueKey="_id"
            placeholder="Select University"
          />

          {/* ✅ COURSE TYPE */}
          <CustomDropdown
            loading={courseLoading}
            options={courseTypes.map((ct) => ({
              label: ct,
              value: ct,
            }))}
            value={courseType}
            onChange={(e) => setCourseType(e.target.value)}
            placeholder="Select UG / PG"
            disabled={!university}
          />

          {/* ✅ DEPARTMENT */}
          <CustomDropdown
            loading={deptLoading}
            options={departments}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            labelKey="name"
            valueKey="_id"
            placeholder="Select Department"
            disabled={!courseType}
          />

          {/* ✅ SEMESTER */}
          <CustomDropdown
            loading={false}
            options={semesters}
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            labelKey="name"
            valueKey="_id"
            placeholder="Select Semester"
            disabled={!department || semesters.length === 0}
          />

          {/* BUTTON */}
          <button
            onClick={handleExplore}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg"
          >
            Explore
          </button>

        </div>
      </div>
    </div>
  );
}