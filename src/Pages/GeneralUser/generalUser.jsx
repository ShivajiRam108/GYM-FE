import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import MemberCard from "../../Components/MemberCard/memberCard";
import {
  getMonthlyJoined,
  threeDaysExpire,
  fourToSevenDaysExpire,
  expiredData,
  inactiveMembers,
} from "./data";

function GeneralUser() {
  const [header, setHeader] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const func = sessionStorage.getItem("func");
    if (func) {
      fetchData(func);
    }
  }, []);

  const fetchData = async (func) => {
    setLoading(true);
    try {
      let response;
      switch (func) {
        case "MonthlyJoined":
          response = await getMonthlyJoined();
          setHeader("Monthly Joined Members");
          break;
        case "threeDaysExpire":
          response = await threeDaysExpire();
          setHeader("Expiring in 3 Days");
          break;
        case "fourToSevenDaysExpire":
          response = await fourToSevenDaysExpire();
          setHeader("Expiring in 4-7 Days");
          break;
        case "expired":
          response = await expiredData();
          setHeader("Expired Members");
          break;
        case "inactiveMembers":
          response = await inactiveMembers();
          setHeader("Inactive Members");
          break;
        default:
          setHeader("Unknown Category");
          response = { members: [] };
      }

      // ✅ Make sure response and members exist
      setData(response?.members || []);
    } catch (error) {
      console.error("Fetch error:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen px-4 py-6 bg-gray-100">
      {/* Header Bar */}
      <div className="w-full max-w-6xl mx-auto mb-6">
        <div className="bg-slate-900 text-white p-4 rounded-lg flex justify-between items-center">
          <Link
            to="/dashboard"
            className="bg-white text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:text-white transition duration-300"
          >
            <ArrowBackIcon className="mr-1" />
            Back To Dashboard
          </Link>
          <h2 className="text-lg sm:text-xl font-semibold">{header}</h2>
        </div>
      </div>

      {/* Members Section */}
      <div className="w-full max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading data...</div>
        ) : data.length === 0 ? (
          <div className="text-center text-red-500 text-lg">No members found.</div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-white p-4 rounded-lg shadow-md">
            {data.map((item, index) => (
              <MemberCard key={index} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GeneralUser;
