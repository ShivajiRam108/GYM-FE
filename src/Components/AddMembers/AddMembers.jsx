

import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { toast, ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AddMembers = () => {
  const [cookies] = useCookies(["token"]);
  const [loaderImage, setLoaderImage] = useState(false);
  const [membershipList, setMembershipList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [inputField, setInputField] = useState({
    name: "",
    mobileNo: "",
    address: "",
    membership: "",
    profilePic: "",
    joiningDate: "",
  });

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoaderImage(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "gym-gms");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dehdpbk2h/image/upload",
        data
      );
      setInputField((prev) => ({
        ...prev,
        profilePic: res.data.secure_url,
      }));
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Image upload failed.");
    } finally {
      setLoaderImage(false);
    }
  };

  const fetchMembership = async (token) => {
    try {
      const res = await axios.get(`${BASE_URL}/plans/get-membership`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const memberships = res.data.membership;
      setMembershipList(memberships);

      if (memberships.length === 0) {
        toast.error("No Membership Added Yet", { className: "text-lg" });
      } else {
        const defaultId = memberships[0]._id;
        setSelectedOption(defaultId);
        setInputField((prev) => ({ ...prev, membership: defaultId }));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch membership plans.");
    }
  };

  useEffect(() => {
    const token = cookies.token;
    if (!token) {
      toast.error("Unauthorized: Please log in.");
      return;
    }
    fetchMembership(token);
  }, [cookies]);

  const handleOnChangeSelect = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setInputField((prev) => ({ ...prev, membership: value }));
  };

  const handleRegisterBtn = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/members/register-member`,
        inputField,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
          withCredentials: true,
        }
      );
      console.log(res);
      toast.success("Added Successfully.");
      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Something Went Wrong.");
    }
  };

  return (
    <div className="text-black">
      <div className="grid gap-5 grid-cols-2 text-lg">
        <input
          value={inputField.name}
          onChange={(e) => handleOnChange(e, "name")}
          type="text"
          placeholder="Name of the Joinee"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />

        <input
          value={inputField.mobileNo}
          onChange={(e) => handleOnChange(e, "mobileNo")}
          type="number"
          placeholder="Mobile No"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />

        <input
          value={inputField.address}
          onChange={(e) => handleOnChange(e, "address")}
          type="text"
          placeholder="Enter Address"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />

        <input
          value={inputField.joiningDate}
          onChange={(e) => handleOnChange(e, "joiningDate")}
          type="date"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />

        <select
          value={selectedOption}
          onChange={handleOnChangeSelect}
          className="border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md"
        >
          {membershipList.map((item, index) => (
            <option key={index} value={item._id}>
              {item.months} Months Membership
            </option>
          ))}
        </select>

        <input type="file" onChange={uploadImage} />

        {loaderImage && (
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="secondary" />
          </Stack>
        )}

        {inputField.profilePic && (
          <div className="w-32 h-32 relative">
            <img
              src={inputField.profilePic}
              alt="Uploaded"
              className="absolute inset-0 rounded-full border-4 border-t-4 border-gray-300 border-t-blue-500 "
            />
          </div>
        )}

        <div
          onClick={handleRegisterBtn}
          className="p-3 border-2 mt-5 w-28 text-lg h-14 text-center bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          Register
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddMembers;
