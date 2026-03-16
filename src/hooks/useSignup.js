import { useState } from "react";
import axios from "axios";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const signup = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const res = await axios.post("https://studyhubapi-e2lb.onrender.com/api/auth/user-signup", formData);

      if (res.data) {   
        console.log("Signup successful:", res.data);
        setSuccess(true);
        
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error, success };
};

export default useSignup;
