import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ForgotPassword = () => {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [loader, setLoader] = useState(false);

  const [contentValue, setContentValue] = useState("Submit Your Email");
  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e, name) => {
    setInputField({ ...inputField, [name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!emailSubmit) {
      sendOtp();
    } else if (emailSubmit && !otpValidate) {
      verifyOtp();
    } else {
      changePassword();
    }
  };

  const sendOtp = async () => {
    setLoader(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/reset-password/sendOtp`,
        { email: inputField.email }
      );
      toast.success(res.data.message);
      setEmailSubmit(true);
      setContentValue("Submit Your OTP");
    } catch (err) {
      toast.error("Error sending OTP");
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const verifyOtp = async () => {
    setLoader(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/reset-password/verifyOtp`,
        {
          email: inputField.email,
          otp: inputField.otp,
        }
      );
      toast.success(res.data.message);
      setOtpValidate(true);
      setContentValue("Change Password");
    } catch (err) {
      toast.error("Invalid OTP");
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const changePassword = async () => {
    setLoader(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/reset-password/updatePassword`,
        {
          email: inputField.email,
          newPassword: inputField.newPassword,
        }
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to reset password");
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  return (
  <div className="min-h-screen flex justify-center items-center bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold text-slate-800 mb-6 text-center">
        Forgot Password
      </h2>

      {/* Email Input */}
      <div className="mb-4 w-full">
        <label className="block text-sm font-semibold text-slate-600 mb-1">
          Email
        </label>
        <input
          type="email"
          value={inputField.email}
          onChange={(e) => handleChange(e, "email")}
          placeholder="example@email.com"
          className="w-full p-3 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* OTP Input */}
      {emailSubmit && (
        <div className="mb-4 w-full">
          <label className="block text-sm font-semibold text-slate-600 mb-1">
            OTP
          </label>
          <input
            type="text"
            value={inputField.otp}
            onChange={(e) => handleChange(e, "otp")}
            placeholder="Enter OTP"
            className="w-full p-3 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      )}

      {/* New Password Input */}
      {otpValidate && (
        <div className="mb-4 w-full">
          <label className="block text-sm font-semibold text-slate-600 mb-1">
            New Password
          </label>
          <input
            type="password"
            value={inputField.newPassword}
            onChange={(e) => handleChange(e, "newPassword")}
            placeholder="Enter New Password"
            className="w-full p-3 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        className="w-full py-3 bg-slate-800 text-white font-semibold rounded hover:bg-white hover:text-slate-800 border border-slate-800 transition duration-200"
        onClick={handleSubmit}
      >
        {contentValue}
      </button>

      {/* Loader */}
      {loader && (
        <div className="w-full mt-4 flex justify-center">
          <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <ToastContainer />
    </div>
  </div>
);

};

export default ForgotPassword;
