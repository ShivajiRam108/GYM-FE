import React, { useState } from 'react';
import Login from '../../Login';
import Register from '../../Register'; // Fixed typo with extra slash

function Home() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900 text-white text-xl font-semibold py-5 text-center shadow-md">
        Welcome To Gym Management System (GYM)
      </header>

      {/* Main Content */}
      <main
        className="flex flex-1 items-center justify-center bg-cover bg-center px-4 py-10"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3")',
        }}
      >
        <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-md p-6">
          {isRegister ? (
            <Register onSwitch={() => setIsRegister(false)} />
          ) : (
            <Login onSwitch={() => setIsRegister(true)} />
          )}
        </div>
      </main>

      {/* Footer (optional) */}
      <footer className="text-center text-gray-100 text-sm py-3 bg-slate-800">
        &copy; {new Date().getFullYear()} Gym Management System. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Home;
