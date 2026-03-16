import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminTopicList() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= LOAD CATEGORY LIST ================= */
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://studyhubapi-e2lb.onrender.com/it-category/",
   
  { withCredentials: true }
      );
      console.log("JJSJSJJS",res);
      setCategories(res.data.data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  /* ================= LOAD TOPICS ================= */
  const fetchTopics = async (category = "") => {
    try {
      setLoading(true);

      const url = category
        ? `https://studyhubapi-e2lb.onrender.com/api/topics?category=${category}`
        : `https://studyhubapi-e2lb.onrender.com/api/topics`;

      const res = await axios.get(url);
      setTopics(res.data.data);

    } catch {
      toast.error("Failed to load topics");
    } finally {
      setLoading(false);
    }
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    fetchCategories();
    fetchTopics(); // 🔥 Load all topics by default
  }, []);

  /* ================= FILTER CHANGE ================= */
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    fetchTopics(value); // 🔥 Refetch with category
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this topic?")) return;

    try {
      await axios.delete(
        `https://studyhubapi-e2lb.onrender.com/api/topics/${id}`,
        { withCredentials: true }
      );

      toast.success("Topic deleted successfully");

      // Refresh list based on current filter
      fetchTopics(selectedCategory);

    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w mx-auto bg-white shadow-xl rounded-xl p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Manage Topics
        </h2>
      </div>

      {/* Category Filter */}
      <div className="bg-gray-50 border rounded-xl p-6 mb-8 shadow-sm">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Filter by Category
        </label>

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full max-w-sm border rounded-lg px-4 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Topic List */}
      {loading ? (
        <p>Loading...</p>
      ) : topics.length === 0 ? (
        <p>No topics found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-xl">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Order</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {topics.map((t, i) => (
                <tr key={t._id} className="border-t">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-medium">{t.title}</td>
                  <td className="p-3">{t.order ?? "-"}</td>
                  <td className="p-3 flex gap-2">

                    {/* Edit */}
                    <button
                      onClick={() =>
                        navigate("/admin/it/create-contents", {
                          state: {
                            topicData: t,
                            isEdit: true,
                          },
                        })
                      }
                      className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
                    >
                      Edit
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="px-3 py-1 rounded bg-red-600 text-white text-sm"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
