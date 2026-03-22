import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLoader } from "../../context/LoaderContext";
export default function ITCourse() {

  const api = axios.create({
    baseURL: "https://studyhubapi-e2lb.onrender.com/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [activeCategoryName, setActiveCategoryName] = useState("");
  const [activeTopicId, setActiveTopicId] = useState("");
  const [topicContent, setTopicContent] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false); // ✅ NEW

  const {setLoading } = useLoader();
  const navRef = useRef(null);

  /* ===== FETCH CATEGORY ===== */
  useEffect(() => {
    setLoading(true);
    api.get("/it-category")
      .then((res) => {
        const data = res.data.data || [];
        setCategories(data);

        if (data.length) {
          setActiveCategoryId(data[0]._id);
          setActiveCategoryName(data[0].name);
        }
      })
      .catch(() => console.error("Failed to load categories"))
      .finally(() => {
  setLoading(false);
});
  }, []);

  /* ===== FETCH TOPICS ===== */
  useEffect(() => {
    if (!activeCategoryId) return;
     setLoading(true);
    api.get(`/api/topics?category=${activeCategoryId}`)
      .then((res) => {
        const data = res.data.data || [];
        setTopics(data);

        if (data.length) {
          setActiveTopicId(data[0]._id);
        } else {
          setActiveTopicId("");
          setTopicContent(null);
        }
      })
      .catch(() => console.error("Failed to load topics"))
      .finally(() => setLoading(false));
  }, [activeCategoryId]);

  /* ===== FETCH CONTENT ===== */
  useEffect(() => {
    if (!activeTopicId) return;
    setLoading(true);
    api.get(`/api/topics/${activeTopicId}`)
      .then((res) => setTopicContent(res.data.data))
      .catch(() => console.error("Failed to load topic content"))
      .finally(() => setLoading(false));
  }, [activeTopicId]);

  return (
    <div className="min-h-screen flex flex-col">

      {/* ===== CATEGORY NAVBAR ===== */}
      <div className="flex items-center bg-gray-600 text-white px-2 py-2 shadow">

        {/* ☰ MENU BUTTON (MOBILE) */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden mr-2 text-xl"
        >
          ☰
        </button>

        <div
          ref={navRef}
          className="flex overflow-x-auto  flex-1 px-2 py-2 bg-white/50 rounded-xl gap-2"
           style={{
    scrollbarWidth: "none",   // Firefox
    msOverflowStyle: "none",  // IE
  }}
        >
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => {
                setActiveCategoryId(cat._id);
                setActiveCategoryName(cat.name);
                setTopics([]);
                setTopicContent(null);
              }}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeCategoryId === cat._id
                  ? "bg-red-700 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ===== MOBILE SIDEBAR ===== */}
      {menuOpen && (
        <div className="fixed inset-0 mt-20 z-50 flex">

          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />

          {/* sidebar */}
          <div className="relative z-50 w-64 h-full bg-indigo-500 text-white p-4 shadow-lg rounded-r-3xl">
            <div className="  border-b border-gray-300 pb-2 mb-3">
            <button
              onClick={() => setMenuOpen(false)}
              className="mb-4 text-xl bor"
            >
              ✕
            </button>
            <span className="text-bold text-lg text-black mx-3">Select a topic</span>
            </div>

            <h2 className="font-bold mb-3">
              {activeCategoryName}
            </h2>

            {topics.map((topic) => (
              <div
                key={topic._id}
                onClick={() => {
                  setActiveTopicId(topic._id);
                  setMenuOpen(false);
                }}
                className={`p-2 rounded cursor-pointer ${
                  activeTopicId === topic._id
                    ? "bg-blue-600"
                    : "hover:bg-indigo-700"
                }`}
              >
                {topic.title}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== CONTENT ===== */}
      <div className="flex flex-1 flex-col md:flex-row">

        {/* ===== SIDEBAR (DESKTOP) ===== */}
        <aside className="hidden md:block md:w-1/4 bg-indigo-400 p-4 ">
          <h2 className="text-xl font-semibold mb-4">
            {activeCategoryName || "Topics"}
          </h2>

          <ul className="space-y-2">
            {topics.map((topic) => (
              <li
                key={topic._id}
                onClick={() => setActiveTopicId(topic._id)}
                className={`cursor-pointer p-2 rounded-lg ${
                  activeTopicId === topic._id
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-green-500"
                }`}
              >
                {topic.title}
              </li>
            ))}
          </ul>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 p-4 md:p-7 bg-gray-300">

          {!topicContent ? (
            <p>Select a topic to view content</p>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">
                {topicContent.title}
              </h1>

              <div
                dangerouslySetInnerHTML={{
                  __html: topicContent.content,
                }}
              />
            </>
          )}

        </main>
      </div>
    </div>
  );
}