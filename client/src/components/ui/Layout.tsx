import React from "react";
import HeaderBar from "../ui/Header";
import { Outlet, useLocation } from "react-router-dom";

const Layout: React.FC = () => {
  const location = useLocation();

  const hideHeader = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white transition-colors duration-300">

      {!hideHeader && <HeaderBar />}

      <main
        className={`
          ${hideHeader ? "pt-0" : "pt-28"}  /* spacing for header */
          px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24
          pb-10
          transition-all duration-300
        `}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
