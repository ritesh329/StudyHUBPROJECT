import React, { useState ,  useEffect} from "react";
import useSignup from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaInstagram } from "react-icons/fa";

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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
    <div className="w-full max-w-sm sm:max-w-md backdrop-blur-lg bg-white/20 border border-white/30 p-6 sm:p-8 rounded-2xl shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">
          Create your Account 
        </h2>
        <p className="text-center text-gray-200 mb-6 text-sm sm:text-base">
          Please fill in the details 
        </p>
  <hr className="flex-1 00 p-4"/>
      <form onSubmit={handleSubmit}
      className="flex flex-col gap-4  ">
        {/*==========================name=================================*/}
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
          required
        />
        {/*==========================email=================================*/}
        <input
          name="email"
          type="email"
          placeholder="Email/mobile no."
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
          required
        />
        {/*==========================password=================================*/}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
          required
        />



        <button 
         className="bg-blue-700 rounded-2xl h-8  max-w w-full text-white font-semibold hover:bg-green-700 "
        type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </button>

      </form>
        {/* Divider */}
  <div className="flex items-center gap-3 my-5">
    <hr className="flex-1 "/>
    <span className=" text-sm">or</span>
    <hr className="flex-1 "/>
  </div>

        {/* Social Icons */}
             <div className="flex justify-center gap-4 mb-4">
               <button className="bg-white p-2 sm:p-3 rounded-full hover:scale-110 transition shadow">
                 <FaGoogle className="text-red-500 text-base sm:text-lg" />
               </button>
     
               <button className="bg-white p-2 sm:p-3 rounded-full hover:scale-110 transition shadow">
                 <FaFacebookF className="text-blue-600 text-base sm:text-lg" />
               </button>
     
               <button className="bg-white p-2 sm:p-3 rounded-full hover:scale-110 transition shadow">
                 <FaInstagram className="text-pink-600 text-base sm:text-lg" />
               </button>
             </div>
     
     
     
               <p className="text-center text-gray-200 text-xs sm:text-sm">
                 Don't have an account?{" "}
                 <Link to="/login" className="text-black font-semibold ml-1 hover:underline">
                   Login
                 </Link>
               </p>
    </div>
    </div>
  );
};

export default Signup;
