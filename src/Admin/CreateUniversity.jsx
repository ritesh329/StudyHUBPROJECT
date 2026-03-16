import { useState } from "react";
import axios from "axios";

export default function AdminCreateUniversity() {
  const [name, setName] = useState("");
  const [courses, setCourses] = useState([]);
  const [msg, setMsg] = useState("");

  /* ======================
     COURSE HANDLERS
  ====================== */
  const addCourse = () =>
    setCourses([...courses, { type: "", departments: [] }]);

  const updateCourseType = (index, value) => {
    const updated = [...courses];
    updated[index].type = value;
    setCourses(updated);
  };

  /* ======================
     DEPARTMENT HANDLERS
  ====================== */
  const addDepartment = (courseIndex) => {
    const updated = [...courses];
    updated[courseIndex].departments.push({ name: "", semesters: [] });
    setCourses(updated);
  };

  const updateDepartmentName = (courseIndex, deptIndex, value) => {
    const updated = [...courses];
    updated[courseIndex].departments[deptIndex].name = value;
    setCourses(updated);
  };

  /* ======================
     SEMESTER HANDLERS
  ====================== */
  const addSemester = (courseIndex, deptIndex) => {
    const updated = [...courses];
    updated[courseIndex].departments[deptIndex].semesters.push("");
    setCourses(updated);
  };

  const updateSemester = (courseIndex, deptIndex, semIndex, value) => {
    const updated = [...courses];
    updated[courseIndex].departments[deptIndex].semesters[semIndex] = value;
    setCourses(updated);
  };

  /* ======================
     SUBMIT
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, courses };

    try {
      // ✅ token get
      const token = localStorage.getItem("token");

      if (!token) {
        setMsg("Please login first");
        return;
      }

      const res = await axios.post(
        "https://studyhubapi-e2lb.onrender.com/api/universities/universities",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMsg(res.data.message || "University created successfully");
      setName("");
      setCourses([]);

    } catch (err) {
      setMsg(err.response?.data?.message || "Error creating university");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white/70 shadow rounded h-full overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4">Create University</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* UNIVERSITY NAME */}
        <div>
          <label className="block text-sm font-medium mb-1">
            University Name
          </label>

          <input
            type="text"
            placeholder="Enter university name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* COURSES */}
        <div className="space-y-4">
          {courses.map((course, cIndex) => (
            <div
              key={cIndex}
              className="border p-4 rounded-lg bg-gray-50 space-y-3"
            >

              {/* COURSE TYPE */}
              <input
                type="text"
                placeholder="Course Type (UG / PG)"
                value={course.type}
                onChange={(e) => updateCourseType(cIndex, e.target.value)}
                required
                className="w-full border px-3 py-2 rounded-md"
              />

              {/* DEPARTMENTS */}
              {course.departments.map((dept, dIndex) => (
                <div
                  key={dIndex}
                  className="ml-4 p-3 border-l-2 border-blue-200 space-y-2"
                >

                  <input
                    type="text"
                    placeholder="Department Name (BSc / BA / BCA)"
                    value={dept.name}
                    onChange={(e) =>
                      updateDepartmentName(cIndex, dIndex, e.target.value)
                    }
                    required
                    className="w-full border px-2 py-1 rounded-md"
                  />

                  {/* SEMESTERS */}
                  {dept.semesters.map((sem, sIndex) => (
                    <input
                      key={sIndex}
                      type="text"
                      placeholder={`Semester ${sIndex + 1}`}
                      value={sem}
                      onChange={(e) =>
                        updateSemester(cIndex, dIndex, sIndex, e.target.value)
                      }
                      required
                      className="w-full border px-2 py-1 rounded-md"
                    />
                  ))}

                  <button
                    type="button"
                    onClick={() => addSemester(cIndex, dIndex)}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded w-full"
                  >
                    + Add Semester
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addDepartment(cIndex)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded w-full"
              >
                + Add Department
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addCourse}
          className="px-4 py-2 bg-indigo-500 text-white rounded w-full"
        >
          + Add Course (UG / PG)
        </button>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded"
        >
          Create University
        </button>
      </form>

      {msg && (
        <p className="mt-4 text-center text-sm text-red-600 font-medium">
          {msg}
        </p>
      )}
    </div>
  );
}