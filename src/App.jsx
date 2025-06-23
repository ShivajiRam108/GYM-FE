import './App.css';
import Header from './Components/Sidebar/Header';
import DashBoard from './Pages/Dashboard/dashboard';
import Home from './Pages/Home/home';
import Member from './Pages/Member/member';
import GeneralUser from './Pages/GeneralUser/generalUser';
import MemberDetails from './Pages/MemberDetail/memberDetail';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLogin");
    if (isLoggedIn) {
      setIsLogin(true);
      navigate("/dashboard");
    } else {
      setIsLogin(false);
      navigate("/");
    }
  }, [sessionStorage.getItem("isLogin")]); // ⚠ Not recommended, but okay for now

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* ✅ Show Header only when logged in */}
      {isLogin && <Header />}

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/member" element={<Member />} />
          <Route path="/specific/:page" element={<GeneralUser />} />
          <Route path="/member/:id" element={<MemberDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
