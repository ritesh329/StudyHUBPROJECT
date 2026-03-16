import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://studyhubapi-e2lb.onrender.com",
    withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
});

const PENDING_DELETES_KEY = "pendingDeletes";

export default function AdminDeletePanel() {
  const [universities, setUniversities] = useState([]);
  const [boards, setBoards] = useState([]);
  const [classes, setClasses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingUniCat, setLoadingUniCat] = useState(true);
  const [loadingBoardsClasses, setLoadingBoardsClasses] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showBoardsAndClasses, setShowBoardsAndClasses] = useState(false);

  // ─── Load Universities + Categories on mount ───────────────────────
  useEffect(() => {
    const loadUniAndCat = async () => {
      setLoadingUniCat(true);
      try {
        const [uniRes, catRes] = await Promise.all([
          api.get("/api/universities/universities"),
          api.get("/it-category"),
        ]);

        setUniversities(uniRes.data.data || []);
        setCategories(catRes.data.data || []);
      } catch (err) {
        console.error("Failed to load universities/categories", err);
        alert("Failed to load main data");
      } finally {
        setLoadingUniCat(false);
      }
    };

    loadUniAndCat();
  }, []);

  // ─── Process pending deletes on every mount (important cleanup) ───
  useEffect(() => {
    const processPending = async () => {
      const pending = JSON.parse(localStorage.getItem(PENDING_DELETES_KEY)) || {
        boards: [],
        classes: [],
      };

      try {
        for (const id of pending.boards) {
          try {
            await api.delete(`/api/delete/boards/${id}`);
          } catch {}
        }
        for (const id of pending.classes) {
          try {
            await api.delete(`/api/delete/classes/${id}`);
          } catch {}
        }
        localStorage.removeItem(PENDING_DELETES_KEY);
      } catch (err) {
        console.error("Pending deletes failed", err);
      }
    };

    processPending();
  }, []);

  // ─── Load Boards + Classes only when section is shown ─────────────
  useEffect(() => {
    if (!showBoardsAndClasses) return;

    const loadBoardsAndClasses = async () => {
      setLoadingBoardsClasses(true);
      try {
        const boardRes = await api.get("/api/boards/boards");
        const boardData = boardRes.data.data || [];
        setBoards(boardData);

        const allClasses = [];
        for (const board of boardData) {
          try {
            const res = await api.get(`/api/boards/boards/${board._id}/classes`);
            const boardClasses = res.data.data || [];
            allClasses.push(...boardClasses.map((cls) => ({ ...cls, boardId: board._id })));
          } catch (err) {
            console.warn(`Classes fetch failed for board ${board._id}`, err);
          }
        }
        setClasses(allClasses);
      } catch (err) {
        console.error("Failed to load boards/classes", err);
        alert("Failed to load boards & classes");
      } finally {
        setLoadingBoardsClasses(false);
      }
    };

    loadBoardsAndClasses();
  }, [showBoardsAndClasses]);

  // ─── Refresh only universities/categories after delete ────────────
  const refreshSimpleLists = async (type) => {
    try {
      if (type === "university") {
        const res = await api.get("/api/universities/universities");
        setUniversities(res.data.data || []);
      } else if (type === "category") {
        const res = await api.get("/it-category");
        setCategories(res.data.data || []);
      }
    } catch (err) {
      console.error("Refresh failed", err);
    }
  };

  // ─── Delete handler ───────────────────────────────────────────────
  const handleDelete = async (url, type, id) => {
    if (!window.confirm(`Delete this ${type}?`)) return;

    setDeletingId(id);

    if (type === "board" || type === "class") {
      if (!showBoardsAndClasses) {
        alert("Please open Boards & Classes section first");
        setDeletingId(null);
        return;
      }

      // UI remove + queue delete
      const pending = JSON.parse(localStorage.getItem(PENDING_DELETES_KEY)) || {
        boards: [],
        classes: [],
      };

      if (type === "board") {
        setBoards((prev) => prev.filter((b) => b._id !== id));
        setClasses((prev) => prev.filter((c) => c.boardId !== id));
        pending.boards = [...pending.boards, id];
      } else {
        setClasses((prev) => prev.filter((c) => c._id !== id));
        pending.classes = [...pending.classes, id];
      }

      localStorage.setItem(PENDING_DELETES_KEY, JSON.stringify(pending));

      await new Promise((r) => setTimeout(r, 600));
    } else {
      // Immediate delete
      try {
        await api.delete(url);
        await refreshSimpleLists(type);
      } catch (err) {
        console.error("Delete failed", err);
        alert("Delete failed – check console");
      }
    }

    setDeletingId(null);
  };

  const renderSection = (title, items, nameKey, urlPrefix, type) => (
    <div className="section">
      <h3 className="section-title">{title}</h3>

      {items.length === 0 ? (
        <p className="empty-message">No {title.toLowerCase()} found</p>
      ) : (
        <div className="grid">
          {items.map((item) => (
            <div key={item._id} className="card">
              <div className="card-content">
                <span className="item-name">{item[nameKey]}</span>
              </div>
              <button
                className={`delete-btn ${deletingId === item._id ? "deleting" : ""}`}
                onClick={() => handleDelete(`${urlPrefix}/${item._id}`, type, item._id)}
                disabled={deletingId !== null}
              >
                {deletingId === item._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (loadingUniCat) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading universities & categories...</p>
      </div>
    );
  }

  return (
    
    <div className="admin-panel ">
      <header className="header">
        <h1>Admin Delete Panel</h1>
        <p>Remove entries carefully — irreversible action</p>
      </header>

      <div className="container">
        {/* Always visible */}
        {renderSection("Universities", universities, "name", "/api/delete/university", "university")}
        {renderSection("Categories", categories, "name", "/api/delete/category", "category")}

        {/* Toggleable section */}
        <div className="toggle-section">
          <button
            className="toggle-btn"
            onClick={() => setShowBoardsAndClasses((prev) => !prev)}
          >
            {showBoardsAndClasses ? "Hide" : "Show"} Boards & Classes
          </button>

          {showBoardsAndClasses && (
            <>
              {loadingBoardsClasses ? (
                <div className="loading-small">
                  <div className="spinner-small"></div>
                  <p>Loading boards & classes...</p>
                </div>
              ) : (
                <>
                  {renderSection("Boards", boards, "name", "/api/delete/boards", "board")}
                  {renderSection("Classes", classes, "className", "/api/delete/classes", "class")}
                </>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .admin-panel {
          font-family: system-ui, -apple-system, sans-serif;
          max-width: 1680px;
          margin: 0 auto;
          padding: 2rem 1rem;
          background: #f9fafb;
          min-height: 100vh;
        }

        .header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .header h1 {
          margin: 0;
          font-size: 2.25rem;
          color: #111827;
        }

        .header p {
          margin: 0.5rem 0 0;
          color: #6b7280;
        }

        .container {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .toggle-section {
          margin-top: 1rem;
        }

        .toggle-btn {
          display: block;
          width: 100%;
          max-width: 400px;
          margin: 0 auto 1.5rem;
          padding: 0.9rem 1.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          background: #4f46e5;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .toggle-btn:hover {
          background: #4338ca;
        }

        .section-title {
          font-size: 1.5rem;
          color: #1f2937;
          margin: 0 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 3px solid #3b82f6;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem;
        }

        .card {
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }

        .card-content {
          padding: 1.25rem 1.5rem;
        }

        .item-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: #111827;
        }

        .delete-btn {
          width: 100%;
          padding: 0.875rem;
          background: #ef4444;
          color: white;
          border: none;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .delete-btn:hover:not(:disabled) {
          background: #dc2626;
        }

        .delete-btn:disabled,
        .delete-btn.deleting {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .empty-message {
          text-align: center;
          color: #6b7280;
          font-style: italic;
          padding: 3rem 1rem;
        }

        .loading-container,
        .loading-small {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 1rem;
          color: #3b82f6;
        }

        .loading-small {
          min-height: 200px;
        }

        .spinner,
        .spinner-small {
          border: 5px solid #e5e7eb;
          border-top: 5px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .spinner {
          width: 3.5rem;
          height: 3.5rem;
          margin-bottom: 1rem;
        }

        .spinner-small {
          width: 2.5rem;
          height: 2.5rem;
          margin-bottom: 0.8rem;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg); 
          }
        }
      `}</style>
    </div>
  );
}