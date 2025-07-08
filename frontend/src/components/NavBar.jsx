"use client";
import MKLogo from "/images/MKLogo.png";

export default function Example() {
  return (
    <header className="fixed top-10 left-0 right-0 bg-[#74070E] mx-auto max-w-7xl rounded-[2rem] px-8 py-4 flex items-center justify-between z-50 opacity-200">
      {/* Logo */}
      <div className="flex-shrink-0">
        <a href="#">
          <img src={MKLogo} alt="Magnolia Kitchen" className="h-10 w-auto" />
        </a>
      </div>

      {/* Nav Links */}
      <nav className="flex gap-x-8 text-white font-crimson text-lg">
        <a href="#" className="border-y-2 border-white px-2">
          Home
        </a>
        <a href="#">Menu</a>
        <a href="#">Portfolio</a>
      </nav>

      {/* Order Button */}
      <div className="bg-[#F5F0F6] text-[#74070E] px-6 py-2 rounded-lg font-crimson text-lg opacity-90">
        Order
      </div>
    </header>
  );
}
