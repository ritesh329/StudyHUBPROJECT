import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function AdminCreateTopic() {

  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state?.topicData;
  const isEdit = location.state?.isEdit || false;

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= AXIOS INSTANCE ================= */

  const api = useMemo(() => {

    return axios.create({
      baseURL: "https://studyhubapi-e2lb.onrender.com",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

  }, []);

  /* ================= LOAD CATEGORIES ================= */

  useEffect(() => {

    const loadCategories = async () => {

      try {

        const res = await api.get("/it-category");
        setCategories(res.data?.data || []);

      } catch {

        toast.error("Failed to load categories");

      }

    };

    loadCategories();

  }, [api]);

  /* ================= EDIT PREFILL ================= */

  useEffect(() => {

    if (!isEdit || !editData) return;

    setCategoryId(editData.category?._id || editData.category || "");
    setTitle(editData.title || "");
    setOrder(editData.order || "");
    setContent(editData.content || "");

  }, [editData, isEdit]);

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!categoryId || !title) {
      toast.error("Required fields missing");
      return;
    }

    try {

      setLoading(true);

      const payload = {
        category: categoryId,
        title,
        content,
        order: order ? Number(order) : undefined,
      };

      if (isEdit) {

        await api.put(`/api/topics/${editData._id}`, payload);
        toast.success("Topic updated successfully");

      } else {

        await api.post("/api/topics", payload);
        toast.success("Topic created successfully");

      }

      navigate("/admin/it/created-topic-List");

    } catch (err) {

      toast.error(
        err?.response?.data?.message || "Operation failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">

      <h3 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Topic" : "Create Topic"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>

          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}

        </select>

        <input
          placeholder="Topic Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Order (optional)"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* CKEDITOR */}

        <CKEditor
          editor={ClassicEditor}
          data={content || "<p>Write your topic content...</p>"}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >

          {loading
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
            ? "Update Topic"
            : "Create Topic"}

        </button>

      </form>

    </div>

  );
}