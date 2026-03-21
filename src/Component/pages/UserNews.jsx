import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserNews() {
  const [newsData, setNewsData] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const API = "https://studyhubapi-e2lb.onrender.com/api/news";

  useEffect(() => {
    axios.get(API)
      .then((res) => {
        const data = res?.data?.data || [];
        const published = data.filter(item => item.isPublished);
        setNewsData(published);
      })
      .catch(() => console.error("Failed to load news"));
  }, []);

  const handleReadMore = (id) => {
    setActiveId((prev) => (prev === id ? null : id));

    // 🔥 smooth scroll
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // 🔥 Date Format
  const formatDateTime = (date) => {
    const d = new Date(date);

    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="p-6 bg-white/30">
      <h2 className="text-2xl text-red-600 font-bold mb-6">
        Latest News
      </h2>

      {/* 🔥 GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {newsData.map((news) => {
          const isOpen = activeId === news._id;

          return (
            <div
              id={news._id}
              key={news._id}
              className={`bg-white shadow-md rounded-lg p-4 transition-all duration-300
              ${isOpen ? "sm:col-span-2 lg:col-span-3" : ""}`}
            >
              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">
                {news.title}
              </h3>

              {/* Author + Date */}
              <p className="text-sm text-gray-500 mb-2">
                ✍️ {news.author} | 🕒 {formatDateTime(news.createdAt)}
              </p>

              {/* Category */}
              <p className="text-sm text-blue-500 mb-2">
                📂 {news.category}
              </p>

              {/* Tags */}
             {/* Tags */}
<div className="flex flex-wrap gap-2 mb-2">
  {news.tags?.map((tag, i) => (
    <span
      key={i}
      className="
        bg-gray-100 
        dark:bg-gray-700 
        text-gray-700 
        dark:text-gray-200 
        text-xs 
        px-3 
        py-1 
        rounded-full 
        border 
        border-gray-200 
        dark:border-gray-600 
        hover:bg-blue-500 
        hover:text-white 
        dark:hover:bg-blue-500 
        dark:hover:text-white 
        hover:border-blue-500 
        transition-all 
        duration-300 
        cursor-pointer
      "
    >
      #{tag}
    </span>
  ))}
</div>

              {/* Content */}
              <p className="text-gray-600 mb-3 transition-all duration-300">
                {isOpen
                  ? news.content
                  : news.content?.slice(0, 80) + "..."}
              </p>

              {/* Views */}
              <p className="text-xs text-gray-400 mb-2">
                👁️ {news.views} views
              </p>

              {/* Button */}
              <button
                onClick={() => handleReadMore(news._id)}
                className="text-red-500 font-semibold"
              >
                {isOpen ? "Show Less" : "Read More"}
              </button>
            </div>
          );
        })}

      </div>
    </div>
  );
}