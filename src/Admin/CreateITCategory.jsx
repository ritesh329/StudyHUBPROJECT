import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
 
const token=localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://studyhubapi-e2lb.onrender.com/it-category",
   withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || token}`,
      },
});

export default function CreateCategory() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/", { name });

      toast.success("Category created successfully");
      setName("");

    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to create category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <h3 className="text-xl font-bold text-center">
          Create IT Subject Category
        </h3>

        <input
          type="text"
          placeholder="Enter category name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}