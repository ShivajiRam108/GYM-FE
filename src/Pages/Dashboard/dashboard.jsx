import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ErrorIcon from "@mui/icons-material/Error";
import ReportIcon from "@mui/icons-material/Report";
import Footer from "./Footer"; 

const DashBoard = () => {
  const [accordionDashboard, setAccordionDashboard] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        accordionDashboard &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setAccordionDashboard(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [accordionDashboard]);

  const handleOnClickMenu = (value) => {
    sessionStorage.setItem("func", value);
  };

  const cardData = [
    {
      to: "/member",
      icon: <PeopleAltIcon sx={{ color: "green", fontSize: 50 }} />,
      label: "Joined Members",
    },
    {
      to: "/specific/monthly",
      onClick: () => handleOnClickMenu("MonthlyJoined"),
      icon: <SignalCellularAltIcon sx={{ color: "purple", fontSize: 50 }} />,
      label: "Monthly Joined",
    },
    {
      to: "/specific/expire-within-3-days",
      onClick: () => handleOnClickMenu("threeDaysExpire"),
      icon: <AccessAlarmIcon sx={{ color: "red", fontSize: 50 }} />,
      label: "Expiring Within 3 Days",
    },
    {
      to: "/specific/expire-withIn-4-to-7-days",
      onClick: () => handleOnClickMenu("fourToSevenDaysExpire"),
      icon: <AccessAlarmIcon sx={{ color: "red", fontSize: 50 }} />,
      label: "Expiring Within 4-7 Days",
    },
    {
      to: "/specific/expired",
      onClick: () => handleOnClickMenu("expired"),
      icon: <ErrorIcon sx={{ color: "red", fontSize: 50 }} />,
      label: "Expired",
    },
    {
      to: "/specific/inactive-members",
      onClick: () => handleOnClickMenu("inactiveMembers"),
      icon: <ReportIcon sx={{ color: "brown", fontSize: 50 }} />,
      label: "Inactive Members",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-grow w-full p-6 text-black">
        {/* Header */}
        {/* <div className="w-full bg-slate-900 text-white rounded-xl flex justify-between items-center p-4">
          <MenuIcon
            sx={{ cursor: "pointer" }}
            onClick={() => setAccordionDashboard((prev) => !prev)}
          />
          <img
            className="w-10 h-10 rounded-full border-2 border-white"
            src="https://i.pinimg.com/736x/cd/f5/a1/cdf5a14790264c1d794e191edc2bd3d9.jpg"
            alt="User"
          />
        </div> */}

        {/* Cards */}
        <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card, index) => (
            <Link
              key={index}
              to={card.to}
              onClick={card.onClick}
              className="bg-white border shadow hover:shadow-xl rounded-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              <div className="flex flex-col items-center justify-center py-8 px-6 text-center hover:bg-slate-900 hover:text-white">
                {card.icon}
                <p className="mt-4 text-lg font-semibold font-mono">
                  {card.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashBoard;
