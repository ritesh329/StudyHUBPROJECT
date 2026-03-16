import { useState, useCallback } from "react";
import axios from "axios";

export const useGetBlogCount = () => {
  const [data, setData] = useState({
    total: 0,
    published: 0,
    drafts: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
// 🔑 get token

  const getBlogCount = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

const token = localStorage.getItem("token"); 
      const res = await axios.get(
        "https://studyhubapi-e2lb.onrender.com/api/blogData/count/blog",   {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ IMPORTANT
          },
          withCredentials: true, // optional (cookie support)
        }
      );

      if (res.data?.success) {
        setData({
          total: res.data.total,
          published: res.data.published,
          drafts: res.data.drafts,
           deleted: res.data.deleted || 0,
        });
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to fetch blog count"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getBlogCount,
    data,
    loading,
    error,
  };
};
