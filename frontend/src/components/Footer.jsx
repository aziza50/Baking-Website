import React from "react";
import MKLogo from "/images/MKLogo.png";
import FacebookLogo from "/images/facebookLogo.png";
import InstaLogo from "/images/insta.webp";

const Footer = () => {
  return (
    <footer className="bg-[#74070E] mx-auto mt-12 max-w-7xl mb-20 rounded-2xl px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-12 relative">
      <div className="flex flex-col gap-4 md:ml-10 text-center md:text-left">
        <h3 className="font-bold font-josefin text-4xl text-white">Contact</h3>
        <p className="font-light font-josefin text-2xl text-white">
          magnoliakitchen.com
        </p>
        <p className="font-light font-josefin text-2xl text-white">
          Stay in the know
        </p>
        <div className="flex gap-4 justify-center md:justify-start">
          <a href="https://www.facebook.com/people/Magnolia-Kitchen/61561656966292/#">
            <img className="h-8 w-auto" src={FacebookLogo} alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/magnolia.kitchen.rva/">
            <img className="h-8 w-auto" src={InstaLogo} alt="Instagram" />
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <img src={MKLogo} alt="Magnolia Kitchen" className="h-50 w-auto" />
        <p className="font-josefin text-white text-xs">
          © 2025 | All RIGHTS RESERVED
        </p>
      </div>

      <div className="flex flex-col gap-4 md:mr-10 text-center md:text-right">
        <h3 className="font-bold font-crimson text-4xl text-white">Navigate</h3>
        <p className="font-light font-josefin text-2xl text-white">Home</p>
        <p className="font-light font-josefin text-2xl text-white">Menu</p>
        <p className="font-light font-josefin text-2xl text-white">Portfolio</p>
      </div>
    </footer>
  );
};

export default Footer;
