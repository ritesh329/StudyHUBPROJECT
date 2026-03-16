import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function ITCourse() {

  /* ================= AXIOS INSTANCE ================= */
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

  const navRef = useRef(null);

  /* =========================
     SCROLL HANDLER
  ========================= */
  const scrollNav = (direction) => {
    navRef.current?.scrollBy({
      left: direction === "left" ? -150 : 150,
      behavior: "smooth",
    });
  };

  /* =========================
     FETCH CATEGORIES (NAVBAR)
  ========================= */
  useEffect(() => {
    api.get("/it-category")
      .then((res) => {
        const data = res.data.data || [];
        setCategories(data);

        if (data.length) {
          setActiveCategoryId(data[0]._id);
          setActiveCategoryName(data[0].name);
        }
      })
      .catch(() => console.error("Failed to load categories"));
  }, []);

  /* =========================
     FETCH TOPICS (SIDEBAR)
  ========================= */
  useEffect(() => {
    if (!activeCategoryId) return;

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
      .catch(() => console.error("Failed to load topics"));
  }, [activeCategoryId]);

  /* =========================
     FETCH TOPIC CONTENT
  ========================= */
  useEffect(() => {
    if (!activeTopicId) return;

    api.get(`/api/topics/${activeTopicId}`)
      .then((res) => setTopicContent(res.data.data))
      .catch(() => console.error("Failed to load topic content"));
  }, [activeTopicId]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ================= NAVBAR ================= */}
      <div className="flex items-center bg-gray-500 text-white px-2 py-2 shadow">
        <button
          onClick={() => scrollNav("left")}
          className="px-2 py-2 bg-gray-700 rounded-l-xl hover:bg-red-600"
        >
          ◀
        </button>

        <div
          ref={navRef}
          className="flex overflow-x-hidden flex-1 px-2 py-2 bg-white/50 rounded-xl"
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
              className={`mr-3 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                activeCategoryId === cat._id
                  ? "bg-red-800 text-white"
                  : "bg-gray-600 text-white hover:bg-green-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollNav("right")}
          className="px-2 py-2 bg-gray-700 rounded-r hover:bg-red-600"
        >
          ▶
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* ===== SIDEBAR ===== */}
        <aside className="md:w-1/4 bg-indigo-400 p-4">
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
        <main className="flex-1 p-7 bg-gray-400">
          {!topicContent ? (
            <p className="text-gray-500">
              Select a topic to view content
            </p>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">
                {topicContent.title}
              </h1>

              <div
                className=" leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: topicContent.content,
                }}
              />

              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="font-medium">
                  Tip: Practice this topic with real code examples.
                </p>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
