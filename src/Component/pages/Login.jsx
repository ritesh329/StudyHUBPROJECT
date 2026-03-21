import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";
import { isUser } from "../../utils/auth";
import { FaGoogle, FaFacebookF, FaInstagram } from "react-icons/fa";
const Login = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error , isAuthenticated } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 useEffect(() => {
    if (isAuthenticated && isUser()) {
      navigate("/", { replace: true }); // 👈 home route (change if needed)
    }
  }, [isAuthenticated ,isUser()]);
      // 🔥 GLOBAL LOADER SYNC

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(loginUser({ email, password }));
 
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500  ">
      <div className="w-full max-w-sm sm:max-w-md   backdrop-blur-lg bg-white/20 border border-white/30 p-6 sm:p-8 rounded-2xl shadow-2xl">

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-200 mb-6 text-sm sm:text-base">
          Login to your account
        </p>
        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="mb-4">
            
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-5">
           
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-300 text-xs sm:text-sm mb-3 text-center">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-800 text-white font-semibold py-3 rounded-full hover:bg-blue-600 transition text-sm sm:text-base"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

 {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="px-3 text-white text-xs sm:text-sm">OR</span>
          <div className="flex-1 h-px bg-white/30"></div>
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
            <Link to="/signup" className="text-black font-semibold ml-1 hover:underline">
              Sign Up
            </Link>
          </p>
      </div>
    </div>
  );
};

export default Login;
