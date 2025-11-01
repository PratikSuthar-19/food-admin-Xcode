import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  if (["/login", "/signup"].includes(location.pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinks = [
    { label: "Orders", path: "/orders" },
    { label: "Users", path: "/users" },
    { label: "Products", path: "/products" },
    { label: "Categories", path: "/categories" },
  ];

  return (
    <header
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
                 w-[95%] max-w-7xl backdrop-blur-xl 
                 bg-[rgba(20,20,20,0.6)] border border-gray-800/60 
                 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                 flex items-center justify-between px-6 md:px-10 py-4
                 text-gray-100 transition-all duration-300"
    >
   
      <h1
        onClick={() => navigate("/")}
        className="text-lg md:text-xl font-semibold tracking-wide select-none cursor-pointer"
      >
        <span className="text-gray-300">Welcome to</span>{" "}
        <span className="text-white font-bold">Xcode Technologies</span>
      </h1>

    
      {isLoggedIn && (
        <nav className="hidden sm:flex items-center gap-4 md:gap-6">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`text-sm font-medium transition-all duration-200 ${
                location.pathname.startsWith(link.path)
                //   ? "text-white border-b-2 border-white"
                //   : "text-gray-300 hover:text-white"

                  ? "text-orange-400 border-b-2 border-orange-400"
                    : "text-gray-300 hover:text-orange-300"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}


      <div className="flex items-center gap-3 md:gap-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500/70 hover:bg-red-500 
                       text-white px-4 py-2 rounded-xl text-sm font-medium
                       transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500/70 hover:bg-blue-500 
                       text-white px-4 py-2 rounded-xl text-sm font-medium
                       transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default HeaderBar;


