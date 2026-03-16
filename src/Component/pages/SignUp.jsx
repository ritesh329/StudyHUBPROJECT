import React, { useState ,  useEffect} from "react";
import useSignup from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup, loading, error, success } = useSignup();
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
      
  useEffect(() => {
      if (success) {

        navigate("/login", { replace: true });
      }
    }, [success,navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (

    <div style={{ maxWidth: "400px", margin: "50px auto" }}
    className="bg-white/60 m-6 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

      <form onSubmit={handleSubmit}
      className="flex flex-col gap-4  ">
            <label className="block text-gray-600 text-sm mb-1">
              Name
            </label>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />


            <label className="block text-gray-600 text-sm mb-1">
              Email / Mobile No.
            </label>
        <input
          name="email"
          type="email"
          placeholder="Email/mobile no."
          value={formData.email}
          onChange={handleChange}
          required
        />

            <label className="block text-gray-600 text-sm mb-1">
              Password
            </label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />



        <button 
         className="bg-blue-700 rounded-2xl h-8  max-w w-full text-white font-semibold hover:bg-green-700 "
        type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>

      </form>
        {/* Divider */}
  <div className="flex items-center gap-3 my-5">
    <hr className="flex-1 border-gray-500"/>
    <span className="text-gray-500 text-sm">or</span>
    <hr className="flex-1 border-gray-500"/>
  </div>

        {/* Google Signup Button */}
      <button
        className="bg-green-600 rounded-2xl h-8  max-w w-full text-white font-semibold hover:bg-red-600"
        onClick={() => alert("Google Signup not implemented yet")}
      >
        Sign up with Google
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Signup Successful 🎉</p>}
    </div>
  );
};

export default Signup;
