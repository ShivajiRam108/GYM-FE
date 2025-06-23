import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginField, setLoginField] = useState({ userName: "", password: "" });

  const handleLogin = async () => {
    if (!loginField.userName || !loginField.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3002/auth/login", // Changed to localhost
        loginField,
        { withCredentials: true }
      );

      localStorage.setItem("gymName", res.data.gym.gymName);
      localStorage.setItem("gymPic", res.data.gym.profilePic);
      sessionStorage.setItem("isLogin", true);
      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful!", {
        onClose: () => {
          navigate("/dashboard");
        },
        autoClose: 2000,
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login Failed.";
      toast.error(errorMessage);
    }
  };

  const handleOnChange = (event, name) => {
    setLoginField({ ...loginField, [name]: event.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        {/* Username */}
        <div className="relative mb-5">
          <input
            onChange={(e) => handleOnChange(e, "userName")}
            value={loginField.userName}
            type="text"
            required
            placeholder="Username"
            className="peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>

        {/* Password */}
        <div className="relative mb-5">
          <input
            onChange={(e) => handleOnChange(e, "password")}
            value={loginField.password}
            type={showPassword ? "text" : "password"}
            required
            placeholder="Password"
            className="peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 pr-10"
          />
          <span
            className="absolute top-3 right-4 text-sm text-blue-600 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 font-medium hover:underline cursor-pointer"
            onClick={onSwitch}
          >
            Register
          </span>
        </p>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
