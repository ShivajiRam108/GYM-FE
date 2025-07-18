

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie"; //  import useCookies
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AddMemberShip = ({ handleClose }) => {
  const [cookies] = useCookies(["token"]); // get token
  const [inputField, setInputField] = useState({ months: "", price: "" });
  const [membership, setMembership] = useState([]);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const fetchMembership = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/plans/get-membership`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`, // ✅ add token here
        },
        withCredentials: true,
      });
      setMembership(res.data.membership);
      toast.success(res.data.membership.length + " Memberships Fetched");
    } catch (err) {
      console.log("Error:", err.response ? err.response.data : err.message);
      toast.error("Something Went Wrong.");
    }
  };

  useEffect(() => {
    fetchMembership();
  }, []);

  const handleAddMembership = async () => {
    if (!inputField.months || !inputField.price) {
      return toast.error("Both fields are required.");
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/plans/add-membership`,
        inputField,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`, //  include token here too
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Membership added successfully");
        setInputField({ months: "", price: "" });
        handleClose();
        fetchMembership(); // refresh list
      } else {
        toast.error(res.data.message || "Failed to add membership");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        err.response?.data?.message || "Something went wrong on the server."
      );
    }
  };

  return (
    <div className="text-black">
      <div className="flex flex-wrap gap-5 items-center justify-center">
        {membership.map((item, index) => (
          <div
            key={index}
            className="text-lg bg-slate-900 text-white border-2 pl-2 pr-2 flex-col gap-3 justify-between pt-1 pb-1 rounded-xl font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            <div>{item.months} Month MemberShip</div>
            <div>{item.price} Rs</div>
          </div>
        ))}
      </div>
      <hr className="mt-10 mb-10" />
      <div className="flex gap-10 mb-10">
        <input
          value={inputField.months}
          onChange={(e) => handleOnChange(e, "months")}
          type="number"
          className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2"
          placeholder="Add No of Months"
        />
        <input
          value={inputField.price}
          onChange={(e) => handleOnChange(e, "price")}
          type="number"
          className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2"
          placeholder="Add Price"
        />
        <div
          onClick={handleAddMembership}
          className="text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          Add +
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddMemberShip;
