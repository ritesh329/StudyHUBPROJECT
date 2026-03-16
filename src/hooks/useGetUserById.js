// hooks/useGetUserById.js
import { useState, useEffect } from "react";
import axios from "axios";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
const useGetUserById = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
   const userId = getUserIdFromToken();

console.log("USER ID:", userId);
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.post(
          `https://studyhubapi-e2lb.onrender.com/api/auth/get-user/${userId}`
        );

        setUser(res.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch user"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};

export default useGetUserById;
