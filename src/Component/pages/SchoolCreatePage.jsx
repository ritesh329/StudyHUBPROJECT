import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLoader } from "../../context/LoaderContext";

export default function ClassSubjects() {
  const { board, cls } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState("");
 const { setLoading, loading } = useLoader();

  useEffect(() => {
    const fetchSchoolNotes = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "https://studyhubapi-e2lb.onrender.com/api/school-notes",
          {
            params: {
              board,
              class: cls,
            },
          }
        );

        const notesData = response?.data?.data || [];

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
        console.error("Error fetching school notes:", error);
        setBlogs([]);
        setSubjects([]);
        setActiveSubject("");
      } finally {
        setLoading(false);
      }
    };

    if (board && cls) {
      fetchSchoolNotes();
    }
  }, [board, cls]);

  const filteredBlogs = blogs.filter(
    (blog) => blog.subject === activeSubject
  );

  return (
    <div className="min-h-screen ">
      {loading && (
  <div className="text-center py-10">
    <p className="text-gray-500">Loading content...</p>
  </div>
)}
      <div className="bg-white/90 sticky top-[80px] z-20 shadow ">
        <div className="max-w mx-auto flex overflow-x-auto">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className={`px-6 py-3 font-semibold whitespace-nowrap border-b-4
                ${
                  activeSubject === subject
                    ? "border-red-400 text-blue-600"
                    : "border-transparent hover:text-blue-400 hover:border-red-300"
                } transition`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
      <div className="m-5">
      <div className="max-w mx-auto mt-6 bg-white/90 p-4 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">
          {activeSubject || "Select Subject"}
        </h2>


        {filteredBlogs.length === 0 && (
          <p className="text-gray-600">
            No content available for this subject
          </p>
        )}

        {
          filteredBlogs.map((blog) => (
            <div key={blog._id} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                {blog.title}
              </h3>

              <div
                className="text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: blog.content,
                }}
              ></div>
            </div>
          ))}
      </div>
    </div>
    </div>
  );
}