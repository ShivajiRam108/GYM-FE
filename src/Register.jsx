import React, { useState } from "react";
import Model from "./Components/Modal/modal";
import ForgotPassword from "./Components/ForgotPassword/forgotPassword";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Register({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loaderImage, setLoaderImage] = useState(false);

  const [inputField, setInputField] = useState({
    userName: "",
    email: "",
    gymName: "",
    password: "",
    profilePic:
      "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg",
  });

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const handleRegister = async () => {
    if (!inputField.userName || !inputField.email || !inputField.gymName || !inputField.password) {
      toast.error("Please fill in all fields");
      return;
    }
const [cookies] = useCookies['token']
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/register`,
        inputField,{
          headers:{
            Authorization: `Bearer ${cookies.token}`,
          }
        }
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const handleClose = () => setForgotPassword((prev) => !prev);

  const uploadImage = async (event) => {
    setLoaderImage(true);
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gym-gms");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dehdpbk2h/image/upload",
        data
      );
      setInputField({ ...inputField, profilePic: response.data.url });
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Image upload failed");
    } finally {
      setLoaderImage(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Register Your Gym 🏋️‍♂️
        </h2>

        {/* Input Fields */}
        <InputField
          label="Enter Username"
          value={inputField.userName}
          onChange={(e) => handleOnChange(e, "userName")}
          type="text"
        />
        <InputField
          label="Enter Email"
          value={inputField.email}
          onChange={(e) => handleOnChange(e, "email")}
          type="email"
        />
        <InputField
          label="Enter Gym Name"
          value={inputField.gymName}
          onChange={(e) => handleOnChange(e, "gymName")}
          type="text"
        />

        {/* Password */}
        <div className="relative mb-5">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={inputField.password}
            onChange={(e) => handleOnChange(e, "password")}
            placeholder=" "
            className="w-full px-4 py-3 border rounded-lg peer focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent pr-10"
          />
          <label className="absolute left-3 top-3 text-gray-500 peer-placeholder-shown:top-3 peer-focus:top-[-10px] peer-focus:text-blue-600 transition-all bg-white px-1">
            Password
          </label>
          <span
            className="absolute right-4 top-3 text-sm text-blue-600 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="w-full mb-3 p-2 border rounded"
        />

        {loaderImage && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <LinearProgress color="secondary" />
          </Stack>
        )}

        {/* Profile Pic Preview */}
        <div className="flex justify-center my-4">
          <img
            src={inputField.profilePic}
            alt="Profile"
            className="h-28 w-28 object-cover rounded-full shadow"
          />
        </div>

        {/* Register Button */}
        <button
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all mb-3"
          onClick={handleRegister}
        >
          Register
        </button>

        {/* Forgot Password Button */}
        <button
          className="w-full py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all mb-3"
          onClick={handleClose}
        >
          Forgot Password
        </button>

        {forgotPassword && (
          <Model
            header="Forgot Password"
            handleClose={handleClose}
            content={<ForgotPassword handleClose={handleClose} />}
          />
        )}

        {/* Switch to Login */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-medium hover:underline cursor-pointer"
            onClick={onSwitch}
          >
            Login
          </span>
        </p>

        <ToastContainer />
      </div>
    </div>
  );
}

// Reusable Input Field
function InputField({ label, value, onChange, type }) {
  return (
    <div className="relative mb-5">
      <input
        type={type}
        required
        value={value}
        onChange={onChange}
        placeholder=" "
        className="w-full px-4 py-3 border rounded-lg peer placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="absolute left-3 top-3 text-gray-500 peer-placeholder-shown:top-3 peer-focus:top-[-10px] peer-focus:text-blue-600 transition-all bg-white px-1">
        {label}
      </label>
    </div>
  );
}

export default Register;
