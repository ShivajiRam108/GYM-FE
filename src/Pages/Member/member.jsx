import React, { useEffect, useState } from "react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MemberCurd from "../../Components/MemberCard/memberCard";
import Model from "../../Components/Modal/modal";
import AddMemberShip from "../../Components/AddMemberShip/AddMemberShip";
import AddMembers from "../../Components/AddMembers/AddMembers";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Member = () => {
  const [addMembership, setMembership] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(9);
  const [totalData, setTotalData] = useState(0);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [isSearchModeOn, setIsSearchModeOn] = useState(false);
  const [noOfPage, setNoOfPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["token"]);

  const limit = 9;

  useEffect(() => {
    fetchData(0, limit);
  }, []);

  const fetchData = async (skip, limit) => {
    console.log("Fetching data with skip:", skip, "and limit:", limit);
    try {
      setLoading(true);
      const res = await axios.get(
        // `${BASE_URL}/members/all-mamber?skip=0&limit=9`,
        `${BASE_URL}/members/all-mamber?skip=${skip}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true, //  Must be inside the same object
        }
      );
      const total = res.data.totalMembers;
      console.log("Total members fetched:", total);
      setTotalData(total);

      setData(res.data.members);
      // console.log(totalData)
      const extraPage = total % limit === 0 ? 0 : 1;
      const totalPages = Math.floor(total / limit) + extraPage;
      setNoOfPage(totalPages);

      if (total === 0) {
        setStartFrom(-1);
        setEndTo(0);
      } else if (total < limit) {
        setStartFrom(0);
        setEndTo(total);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something Technical Fault.");
      setLoading(false);
    }
  };

  const handelMembership = () => setMembership((prev) => !prev);
  const handleMember = () => setAddMember((prev) => !prev);

  const handlePrev = () => {
    if (currentPage !== 1) {
      const currPage = currentPage - 1;
      const from = (currPage - 1) * limit;
      const to = currPage * limit;
      const skipVal = skip - limit;
      setCurrentPage(currPage);
      setStartFrom(from);
      setEndTo(to);
      setSkip(skipVal);
      fetchData(skipVal, limit);
    }
  };

  const handleNext = () => {
    if (currentPage !== noOfPage) {
      const currPage = currentPage + 1;
      const from = (currPage - 1) * limit;
      const to = Math.min(currPage * limit, totalData);
      const skipVal = skip + limit;
      setCurrentPage(currPage);
      setStartFrom(from);
      setEndTo(to);
      setSkip(skipVal);
      fetchData(skipVal, limit);
    }
  };

  const handleSearchData = async () => {
    if (search !== "") {
      setIsSearchModeOn(true);
      try {
        setLoading(true);
        const res = await axios.get(
          `${BASE_URL}/members/searched-members?searchTerm=${search}`,
          {
            headers:{
              Authorization:`Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        setData(res.data.member);
        setTotalData(res.data.totalMembers);
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error("Technical Fault.");
        setLoading(false);
      }
    } else {
      if (isSearchModeOn) {
        window.location.reload();
      } else {
        toast.error("Please Enter any Value.");
      }
    }
  };

  return (
    <div className="text-black p-4 w-full md:w-11/12 mx-auto font-sans">
      {/* Top Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 text-white rounded-lg p-4">
        <button
          className="flex items-center gap-2 border-2 px-4 py-2 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
          onClick={handleMember}
        >
          Add Member <FitnessCenterIcon />
        </button>
        <button
          className="flex items-center gap-2 border-2 px-4 py-2 mt-3 md:mt-0 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
          onClick={handelMembership}
        >
          Add Membership <AddIcon />
        </button>
      </div>

      {/* Back link */}
      <Link
        to="/dashboard"
        className="block mt-4 text-blue-700 hover:underline"
      >
        <ArrowBackIcon /> Back to Dashboard
      </Link>

      {/* Search Input */}
      <div className="mt-5 flex flex-col sm:flex-row gap-3 w-full md:w-3/4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="flex-1 p-2 rounded-lg border border-gray-300"
          placeholder="Search By Name Or Mobile No"
        />
        <button
          onClick={handleSearchData}
          className="bg-slate-900 p-3 text-white rounded-lg hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
        >
          <SearchIcon />
        </button>
      </div>

      {/* Header Info + Pagination */}
      <div className="mt-5 text-xl sm:text-2xl flex flex-col sm:flex-row justify-between items-center">
        <div>Total Members: {totalData}</div>
        {!isSearchModeOn && (
          <div className="flex items-center gap-3 mt-3 sm:mt-0">
            <span>
              {startFrom + 1} - {endTo} of {totalData} Members
            </span>
            <button
              className={`w-8 h-8 flex items-center justify-center border rounded hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black ${
                currentPage === 1 ? "bg-gray-200 text-gray-400" : ""
              }`}
              onClick={handlePrev}
            >
              <ChevronLeftIcon />
            </button>
            <button
              className={`w-8 h-8 flex items-center justify-center border rounded hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black ${
                currentPage === noOfPage ? "bg-gray-200 text-gray-400" : ""
              }`}
              onClick={handleNext}
            >
              <ChevronRightIcon />
            </button>
          </div>
        )}
      </div>

      {/* Member Cards or Loading / No Data */}
      <div className="bg-slate-100 p-4 mt-5 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[200px]">
        {loading ? (
          <p className="col-span-full text-center text-lg text-gray-600">
            Loading members...
          </p>
        ) : data.length === 0 ? (
          <p className="col-span-full text-center text-lg text-gray-500">
            No members found.
          </p>
        ) : (
          data.map((item, index) => <MemberCurd item={item} key={index} />)
        )}
      </div>

      {/* Modals */}
      {addMembership && (
        <Model
          header="Add Membership"
          handleClose={handelMembership}
          content={<AddMemberShip handleClose={handelMembership} />}
        />
      )}
      {addMember && (
        <Model
          header="Add New Members"
          handleClose={handleMember}
          content={<AddMembers />}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Member;
