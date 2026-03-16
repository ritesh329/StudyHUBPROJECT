import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UniversitySubjectContent() {
  const { university, courseType, department, semester } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     FETCH UNIVERSITY NOTES
  ========================= */
  useEffect(() => {
    const fetchUniversityNotes = async () => {
      try {
        setLoading(true);

        console.log("Sending Params:", {
          university,
          courseType,
          department,
          semester,
        });

        const response = await axios.get(
          "https://studyhubapi-e2lb.onrender.com/api/university-notes",
          {
            params: {
              university,
              courseType,
              department,
              semester,
            },
          }
        );

        const notesData = response?.data?.data || [];

        console.log("API Response:", notesData);

        setBlogs(notesData);

        if (notesData.length > 0) {
          const uniqueSubjects = [
            ...new Set(notesData.map((note) => note.subject)),
          ];

          setSubjects(uniqueSubjects);
          setActiveSubject(uniqueSubjects[0]);
        } else {
          setSubjects([]);
          setActiveSubject("");
        }
      } catch (error) {
        console.error("Error fetching university notes:", error);
        setBlogs([]);
        setSubjects([]);
        setActiveSubject("");
      } finally {
        setLoading(false);
      }
    };

    if (university && courseType && department && semester) {
      fetchUniversityNotes();
    }
  }, [university, courseType, department, semester]);

  /* =========================
     FILTER BY SUBJECT
  ========================= */
  const filteredBlogs = activeSubject
    ? blogs.filter((blog) => blog.subject === activeSubject)
    : [];

  return (
    <div className="min-h-screen">
      {/* SUBJECT SUB-NAVBAR */}
      <div className="bg-white sticky top-[80px] z-40 shadow">
        <div className="max-w-5xl mx-auto flex overflow-x-auto">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSubject(sub)}
              className={`px-6 py-3 font-semibold whitespace-nowrap border-b-4
                ${
                  activeSubject === sub
                    ? "border-red-500 text-blue-700"
                    : "border-transparent hover:text-blue-500 hover:border-red-400"
                } transition`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* SUBJECT CONTENT */}
      <div className="max-w mx-auto mt-6 px-4  ">
        {loading && <p>Loading content...</p>}

        {!loading && filteredBlogs.length === 0 && (
          <p className="text-gray-500">No content available</p>
        )}

        {!loading &&
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white/90 p-6 mb-6 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-3 text-indigo-700">
                {blog.title}
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                Author: {blog.author || "Anonymous"}
              </p>

              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: blog.content,
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
