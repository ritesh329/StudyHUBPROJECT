// hooks/useCreateBlog.js
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  createBlogStart,
  createBlogSuccess,
  createBlogFailure,
} from "../redux/blog/blogSlice"; // ✅ correct path

export const useCreateBlog = () => {
  const dispatch = useDispatch();

  const createBlog = async (data) => {
    try {
      dispatch(createBlogStart());
const token = localStorage.getItem("token");
      const res = await axios.post("https://studyhubapi-e2lb.onrender.com/api/blogData", data,
  {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ IMPORTANT
    },
    withCredentials: true, // optional (cookie support)
  });

      dispatch(createBlogSuccess(res.data));
      return true;
    } catch (err) {
      dispatch(
        createBlogFailure(
          err?.response?.data?.message || "Blog creation failed"
        )
      );
      return false;
    }
  };

  return { createBlog };
};
