// hooks/useGetBlogById.js
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  getBlogByIdStart,
  getBlogByIdSuccess,
  getBlogByIdFailure,
} from "../redux/blog/blogSlice";

export const useGetBlogById = () => {
  const dispatch = useDispatch();

  const getBlogById = async (id) => {
    try {
      dispatch(getBlogByIdStart());
const token = localStorage.getItem("token");
      const res = await axios.get(
        `https://studyhubapi-e2lb.onrender.com/api/blogData/getBlog/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ IMPORTANT
    },
    withCredentials: true, // optional (cookie support)
  }
      );

      dispatch(getBlogByIdSuccess(res.data.data));
    } catch (err) {
      dispatch(
        getBlogByIdFailure(
          err.response?.data?.message || "Fetch blog failed"
        )
      );
    }
  };

  return { getBlogById };
};
