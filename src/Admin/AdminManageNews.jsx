import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminAddNews from "./AdminAddNews";

export default function AdminManageNews() {

  const [newsList, setNewsList] = useState([]);
  const [editData, setEditData] = useState(null);

  const API = "https://studyhubapi-e2lb.onrender.com/api/news";
  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  /* ================= FETCH NEWS ================= */
  const fetchNews = async () => {
    try {
      const res = await axios.get(API);
      setNewsList(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news?")) return;

    try {
      await axios.delete(`${API}/${id}`, authHeader);
      fetchNews();
    } catch (error) {
      console.error(error);
      alert("Unauthorized or error deleting");
    }
  };

  /* ================= TOGGLE PUBLISH ================= */
  const togglePublish = async (item) => {
    try {
      await axios.put(
        `${API}/${item._id}`,
        { isPublished: !item.isPublished },
        authHeader
      );
      fetchNews();
    } catch (error) {
      console.error(error);
      alert("Unauthorized or error updating");
    }
  };

  return (
    <div className="space-y-6">

      <AdminAddNews editData={editData} refresh={fetchNews} />

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">Manage News</h2>

        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Views</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {newsList.map((item) => (
              <tr key={item._id} className="border-b">
                <td>{item.title}</td>
                <td>
                  {item.isPublished ? (
                    <span className="text-green-600">Published</span>
                  ) : (
                    <span className="text-yellow-600">Draft</span>
                  )}
                </td>
                <td>{item.views}</td>
                <td className="space-x-2">

                  <button
                    onClick={() => setEditData(item)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => togglePublish(item)}
                    className="bg-indigo-500 text-white px-2 py-1 rounded"
                  >
                    Toggle
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}