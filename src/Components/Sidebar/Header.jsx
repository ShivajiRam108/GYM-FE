import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import SunnyIcon from '@mui/icons-material/Sunny';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [greeting, setGreeting] = useState("");
  const [isDay, setIsDay] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
      setIsDay(true);
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon");
      setIsDay(true);
    } else if (currentHour >= 17 && currentHour < 21) {
      setGreeting("Good Evening");
      setIsDay(false);
    } else {
      setGreeting("Good Night");
      setIsDay(false);
    }
  }, []);

const handleLogout = (e) => {
  e.preventDefault();
  const confirmed = window.confirm("Are you sure you want to logout?");
  if (confirmed) {
    sessionStorage.clear();
    localStorage.clear(); // optional
    navigate("/");
  }
};

  return (
    <header className="w-full bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left: Logo & Greeting */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
            <img
              className="w-full h-full object-cover"
              src={localStorage.getItem("gymPic")}
              alt="Gym"
            />
          </div>
          <div>
            <div className="text-xl font-bold">{localStorage.getItem("gymName")}</div>
            <div className="text-sm text-gray-400 flex items-center gap-2">
              {greeting}
              {isDay ? (
                <SunnyIcon style={{ color: '#FFD700' }} />
              ) : (
                <Brightness1Icon style={{ color: '#FFD700' }} />
              )}
            </div>
          </div>
        </div>

        {/* Desktop Nav Center-Aligned */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-12 text-lg font-medium">
          <Link
            to="/dashboard"
            className={`hover:text-amber-400 transition ${
              location.pathname === "/dashboard" ? "text-amber-400 underline" : ""
            }`}
          >
            <HomeIcon className="mr-1" />
            Dashboard
          </Link>
          <Link
            to="/member"
            className={`hover:text-amber-400 transition ${
              location.pathname === "/member" ? "text-amber-400 underline" : ""
            }`}
          >
            <GroupIcon className="mr-1" />
            Members
          </Link>
        </nav>

        {/* Right: Logout */}
        <div className="hidden md:flex">
          <button
            onClick={handleLogout}
            className="bg-slate-800 px-4 py-2 rounded-lg hover:bg-gradient-to-r from-indigo-500 to-pink-500 hover:text-black flex items-center gap-2"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-slate-900 text-white">
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className={`block py-2 border-b border-gray-700 ${
              location.pathname === "/dashboard" ? "text-amber-400" : ""
            }`}
          >
            <HomeIcon className="mr-2" />
            Dashboard
          </Link>
          <Link
            to="/member"
            onClick={() => setMenuOpen(false)}
            className={`block py-2 border-b border-gray-700 ${
              location.pathname === "/member" ? "text-amber-400" : ""
            }`}
          >
            <GroupIcon className="mr-2" />
            Members
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="w-full text-left py-2 border-b border-gray-700 flex items-center gap-2"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
