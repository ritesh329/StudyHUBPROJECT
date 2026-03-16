// hooks/useUpdateBlog.js
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  updateBlogStart,
  updateBlogSuccess,
  updateBlogFailure,
} from "../redux/blog/blogSlice";

export const useUpdateBlog = () => {
  const dispatch = useDispatch();

  const updateBlog = async (id, payload) => {
    try {
      dispatch(updateBlogStart());
   const token = localStorage.getItem("token");
      const res = await axios.post(
        `https://studyhubapi-e2lb.onrender.com/api/blogData/update/${id}`,
        payload, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ IMPORTANT
          },
          withCredentials: true, // optional (cookie support)
        }
      );

      dispatch(updateBlogSuccess(res.data.data));
    } catch (err) {
      dispatch(
        updateBlogFailure(
          err.response?.data?.message || "Update blog failed"
        )
      );
    }
  };

  return { updateBlog };
};
