import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminAddNews({ editData, refresh }) {

  const API = "https://studyhubapi-e2lb.onrender.com/api/news";
  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    tags: "",
    category: "",
    isPublished: false,
  });

  /* ================= EDIT MODE ================= */
  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        content: editData.content || "",
        author: editData.author || "",
        tags: editData.tags?.join(",") || "",
        category: editData.category?._id || editData.category || "",
        isPublished: editData.isPublished || false,
      });
    }
  }, [editData]);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      content: form.content,
      author: form.author,
      category: form.category,
      isPublished: form.isPublished,
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim())
        : [],
    };

    try {
      if (editData) {
        await axios.put(
          `${API}/${editData._id}`,
          payload,
          authHeader
        );
        alert("News updated successfully");
      } else {
        await axios.post(
          API,
          payload,
          authHeader
        );
        alert("News created successfully");
      }

      refresh();

      // Reset form
      setForm({
        title: "",
        content: "",
        author: "",
        tags: "",
        category: "",
        isPublished: false,
      });

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error saving news");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        {editData ? "Edit News" : "Add News"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="News Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="content"
          placeholder="News Content (HTML allowed)"
          value={form.content}
          onChange={handleChange}
          rows="6"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category ID"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={form.isPublished}
            onChange={handleChange}
          />
          Publish Now
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editData ? "Update News" : "Create News"}
        </button>

      </form>
    </div>
  );
}