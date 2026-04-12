import Link from "next/link";
import Image from "next/image";
import { josefin } from "../styles/fonts";

export default function Footer() {
  return (
    <footer className="bg-[#74070E] mx-auto max-w-7xl mb-20 rounded-2xl px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-12 ">
      <div className="flex flex-col gap-4 md:ml-10 text-center md:text-left">
        <h3 className={`font-bold ${josefin.className} text-4xl text-white`}>
          Contact
        </h3>
        <p className={`font-light ${josefin.className} text-2xl text-white`}>
          magnoliakitchen.com
        </p>
        <p className={`font-light ${josefin.className} text-2xl text-white`}>
          Stay in the know
        </p>
        <div className="flex gap-4 justify-center md:justify-start">
          <a href="https://www.facebook.com/people/Magnolia-Kitchen/61561656966292/#">
            <Image
              className="h-8 w-auto"
              src="/images/facebookLogo.png"
              alt="Facebook"
              width={32}
              height={32}
            />
          </a>
          <a href="https://www.instagram.com/magnolia.kitchen.rva/">
            <Image
              className="h-8 w-auto"
              src="/images/insta.webp"
              alt="Instagram"
              width={32}
              height={32}
            />
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Image
          src="/images/MKLogo.png"
          alt="Magnolia Kitchen"
          className="h-50 w-auto"
          width={200}
          height={200}
        />
        <p className={` text-white text-xs ${josefin.className}`}>
          © 2025 | All RIGHTS RESERVED
        </p>
      </div>

      <div className="flex flex-col gap-4 md:mr-10 text-center md:text-right">
        <h3 className={`font-bold ${josefin.className} text-4xl text-white`}>
          Navigate
        </h3>
        <Link
          href="/"
          className={`font-light ${josefin.className} text-2xl text-white`}
        >
          Home
        </Link>
        <Link
          href="/menu/collection"
          className={`font-light ${josefin.className} text-2xl text-white`}
        >
          Menu
        </Link>
        <Link
          href="/portfolio"
          className={`font-light ${josefin.className} text-2xl text-white`}
        >
          Portfolio
        </Link>
      </div>
    </footer>
  );
}
