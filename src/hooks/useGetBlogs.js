// hooks/useGetBlogs.js
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  getBlogsStart,
  getBlogsSuccess,
  getBlogsFailure,
} from "../redux/blog/blogSlice";

export const useGetBlogs = () => {
  const dispatch = useDispatch();

  const getBlogs = async () => {
    try {
      dispatch(getBlogsStart());
     const token = localStorage.getItem("token");
      const res = await axios.get("https://studyhubapi-e2lb.onrender.com//api/blogData",  {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ IMPORTANT
          },
          withCredentials: true, // optional (cookie support)
        });
 // ✅ IMPORTANT FIX
      const blogsArray = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

         dispatch(getBlogsSuccess(blogsArray));

    } catch (err) {
      dispatch(
        getBlogsFailure(
          err?.response?.data?.message || "Failed to fetch blogs"
        )
      );
    }
  };

  return { getBlogs };
};
