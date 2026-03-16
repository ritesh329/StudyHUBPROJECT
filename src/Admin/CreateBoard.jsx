import { useState } from "react";
import axios from "axios";

export default function CreateBoardWithClass() {
  const [boardName, setBoardName] = useState("");
  const [className, setClassName] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!boardName.trim() || !className.trim()) {
      setMsg("Board and Class both required");
      return;
    }

    try {
      setLoading(true);

      // ✅ get token
      const token = localStorage.getItem("token");

      if (!token) {
        setMsg("Please login first");
        return;
      }

      // ✅ Step 1 — Create Board
      const boardRes = await axios.post(
        "https://studyhubapi-e2lb.onrender.com/api/boards/boards",
        { name: boardName.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const boardId =
        boardRes.data.data?._id ||
        boardRes.data.board?._id ||
        boardRes.data._id;

      if (!boardId) {
        throw new Error("Board ID not returned");
      }

      // ✅ Step 2 — Create Class
      await axios.post(
        `https://studyhubapi-e2lb.onrender.com/api/boards/boards/${boardId}/classes`,
        { className: className.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMsg("Create Board & Class successfully");
      setBoardName("");
      setClassName("");

    } catch (err) {
      setMsg(err.response?.data?.message || err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl space-y-5 mx-auto bg-white/70 p-6 rounded-2xl shadow-md mt-6"
    >
      <h3 className="font-bold text-lg">
        Create Board & Class (6-12) Together
      </h3>

      <input
        className="border p-2 w-full rounded"
        placeholder="Board Name"
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
      />

      <input
        className="border p-2 w-full rounded"
        placeholder="Class Name (6-12)"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Creating..." : "Create Board & Class"}
      </button>

      {msg && (
        <p className="text-[17px] font-medium text-red-800">
          {msg}
        </p>
      )}
    </form>
  );
}