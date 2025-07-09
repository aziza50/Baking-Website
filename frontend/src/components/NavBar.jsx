"use client";
import { Link } from "react-router-dom";
import MKLogo from "/images/MKLogo.png";
import { HashLink } from "react-router-hash-link";
export default function Example() {
  return (
    <header className="fixed top-10 left-0 right-0 bg-[#74070E] mx-auto max-w-7xl rounded-[2rem] px-8 py-4 flex items-center justify-between z-50 opacity-200">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link to="/home">
          <img src={MKLogo} alt="Magnolia Kitchen" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex gap-x-8 text-white font-crimson text-lg">
        <Link
          to="/home"
          className="border-y-2 border-transparent hover:border-white px-1 duration-100"
        >
          Home
        </Link>
        <Link
          to="/menu"
          className="border-y-2 border-transparent hover:border-white px-1 duration-100"
        >
          Menu
        </Link>
        <Link
          to="/portfolio"
          className="border-y-2 border-transparent hover:border-white px-1 duration-100"
        >
          Portfolio
        </Link>
      </nav>

      {/* Order Button */}
      <HashLink smooth to="/#order">
        <button className="bg-[#F5F0F6] text-[#74070E] px-6 py-2 rounded-lg font-crimson text-lg opacity-90">
          Order
        </button>
      </HashLink>
    </header>
  );
}
