

import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const MemberDetails = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Pending");
  const [renew, setRenew] = useState(false);
  const [data, setData] = useState(null);
  const [membership, setMembership] = useState([]);
  const [planMember, setPlanMember] = useState("");
  const { id } = useParams();
  const [cookies] = useCookies(['token']); // Fixed line

  useEffect(() => {
    fetchData();
    fetMemberShip();
  }, []);

  const fetMemberShip = async () => {
    await axios
      .get(`${BASE_URL}/plans/get-membership`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setMembership(res.data.membership);
        setPlanMember(res.data.membership[0]._id);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong.");
      });
  };

  const fetchData = async () => {
    await axios
      .get(`${BASE_URL}/members/get-member/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.member);
        setStatus(res.data.member.status);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
      });
  };

  const handleSwitchBtn = async () => {
    let statuss = status === "Active" ? "Pending" : "Active";
    try {
      const res = await axios.post(
        `${BASE_URL}/members/change-status/${id}`,
        { status: statuss },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        }
      );
      console.log(res);
      
      toast.success("Status Changed.");
      setStatus(statuss);
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  };

  const isDateInPast = (inputData) => {
    const today = new Date();
    const giveDate = new Date(inputData);
    return giveDate < today;
  };

  const handleOnChangeSelect = (event) => {
    let value = event.target.value;
    setPlanMember(value);
  };

  const handleRenewSaveBtn = async () => {
    await axios
      .put(
        `${BASE_URL}/members/update-member-plan/${id}`,
        { membership: planMember },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setData(res.data.member);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error("Something Went Wrong.");
        console.log(err);
      });
  };

  return (
    <div className="w-3/4 text-black p-5 ">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="border-2 w-fit text-xl font-sans text-white p-2 rounded-xl bg-slate-900 cursor-pointer"
      >
        <ArrowBackIcon /> Go Back
      </div>

      <div className="mt-10 p-2 ">
        <div className="w-[100%] h-fit flex">
          <div className="w-1/3 mx-auto">
            <img src={data?.profilePic} className="w-full mx-auto" alt="" />
          </div>
          <div className="w-2/3 mt-5 text-xl 5">
            <div className="mt-1 mb-2 text-xl font-semibold">Name :{data?.name}</div>
            <div className="mt-1 mb-2 text-xl font-semibold">Mobile : {data?.mobileNo}</div>
            <div className="mt-1 mb-2 text-xl font-semibold">Address : {data?.address}</div>
            <div className="mt-1 mb-2 text-xl font-semibold">
              Joined Date : {data?.createdAt?.slice(0, 10).split("-").reverse().join("-")}
            </div>
            <div className="mt-1 mb-2 text-xl font-semibold">
              Next Bill Date : {data?.nextBillDate?.slice(0, 10).split("-").reverse().join("-")}
            </div>
            <div className="mt-1 mb-2 flex gap-4 text-2xl font-semibold">
              Status :
              <Switch
                onColor="#6366F1"
                checked={status === "Active"}
                onChange={() => handleSwitchBtn()}
              />
            </div>

            {isDateInPast(data?.nextBillDate) && (
              <div
                onClick={() => {
                  setRenew((prev) => !prev);
                }}
                className={`mt-1 rounded-lg p-3 border-2 border-slate-900 text-center w-full md-w-1/2 cursor-pointer  ${
                  renew && status === "Active"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                    : ""
                } hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300`}
              >
                Renew
              </div>
            )}

            {renew && status === "Active" && (
              <div className="rounded-lg p-3 mt-5 mb-5 h-fit bg-slate-50 w-[100%]">
                <div className="w-full">
                  <div className="my-5">
                    <div>MemberShip</div>
                    <select
                      value={planMember}
                      onChange={handleOnChangeSelect}
                      className="w-full border-2 p-2 rounded-lg"
                    >
                      {membership.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.months} Months Membership
                        </option>
                      ))}
                    </select>
                    <div
                      onClick={() => handleRenewSaveBtn()}
                      className="mt-3 rounded-lg p-3 border-2 border-slate-900 text-center w-1/2 mx-auto cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    >
                      Save
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MemberDetails;
