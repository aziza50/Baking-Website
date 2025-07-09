import React from "react";
import Header from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[url('/images/pape.webp')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white opacity-20 z-0"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;
