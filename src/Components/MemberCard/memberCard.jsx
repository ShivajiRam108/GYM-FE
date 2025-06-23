import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom';

const MemberCard = ({ item }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return dateStr.slice(0, 10).split("-").reverse().join("-");
  };

  return (
    <Link
      to={`/member/${item?._id}`}
      className="w-full max-w-sm bg-white rounded-2xl p-5 shadow hover:shadow-xl hover:scale-[1.02] hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer mx-auto"
    >
      {/* Profile Picture with Status */}
      <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full border-4 border-gray-300 relative overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-full"
          src={item?.profilePic}
          alt="Profile"
        />
        <CircleIcon
          className="absolute top-1 left-1"
          sx={{
            color: item?.status === 'Active' ? 'greenyellow' : 'red',
            fontSize: 16,
            backgroundColor: 'white',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Member Name */}
      <h2 className="text-center text-lg md:text-xl font-semibold mt-4 truncate">
        {item?.name || "No Name"}
      </h2>

      {/* Mobile Number */}
      <p className="text-center text-sm md:text-base text-gray-600 mt-2 group-hover:text-white">
        📞 +91 {item?.mobileNo || "N/A"}
      </p>

      {/* Next Bill Date */}
      <p className="text-center text-sm md:text-base text-gray-600 mt-2 group-hover:text-white">
        🧾 <span className="font-medium">Next Bill:</span>{" "}
        <span className="font-semibold">{formatDate(item?.nextBillDate)}</span>
      </p>
    </Link>
  );
};



export default MemberCard;
