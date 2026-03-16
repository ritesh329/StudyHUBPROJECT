import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";
import { isUser } from "../../utils/auth";
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
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-cover bg-center" style={{ backgroundImage: "url('/images/login-bg.jpg')" }}>
      <div className="w-full max-w-sm bg-white/60 p-6 rounded-lg shadow-md">

        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-gray-600 text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-3">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-red-500 mt-4">
          Don’t have an account?
          <span className="text-black cursor-pointer ml-1">
            <Link to="/signup">Sign Up</Link>
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;
