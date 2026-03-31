"use client";
import Link from "next/link";
import Image from "next/image";
import { crimson } from "../styles/fonts";
import { useRouter } from "next/navigation";
import { ShoppingCart, User } from "lucide-react";
import LogOut from "./logout";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

export default function Navbar(isAuthenticated: boolean = false) {
  const router = useRouter();
  return (
    <header className="fixed top-10 left-0 right-0 bg-[#74070E] mx-auto max-w-7xl rounded-[2rem] px-8 py-3 flex items-center justify-between z-50 opacity-200">
      {/* Logo */}
      <div className="shrink-0">
        <Link href="/">
          <Image
            src="/images/MKLogo.png"
            alt="Magnolia Kitchen"
            className="h-10 w-auto"
            width={200}
            height={60}
          />
        </Link>
      </div>

      {/* Nav Links */}
      <nav className={`flex gap-x-8 text-white ${crimson.className} text-lg`}>
        <Link
          href="/"
          className="border-y-2 border-transparent hover:border-white px-1 duration-100"
        >
          Home
        </Link>
        <Link
          href="/menu"
          className="border-y-2 border-transparent hover:border-white px-1 duration-100"
        >
          Menu
        </Link>
        <Link
          href="/portfolio"
          className="border-y-2 border-transparent hover:border-white px-1 duration-100"
        >
          Portfolio
        </Link>
      </nav>
      <div className="gap-4 flex items-center">
        <Menubar className="w-72">
          <MenubarMenu>
            <MenubarTrigger>
              <User />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>Profile</MenubarSubTrigger>
                {isAuthenticated && (
                  <MenubarSubContent>
                    <Link href="/user/profile">
                      <MenubarItem>View Profile</MenubarItem>
                    </Link>
                    <Link href="/user/edit">
                      <MenubarItem>Edit Profile</MenubarItem>
                    </Link>
                  </MenubarSubContent>
                )}
              </MenubarSub>
              <MenubarItem>
                {isAuthenticated ? (
                  "Logout"
                ) : (
                  <Link href="/auth/login">Login</Link>
                )}
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <Link href="/cart">
              <MenubarTrigger>
                <ShoppingCart />
              </MenubarTrigger>
            </Link>
            <MenubarContent>
              <MenubarItem>Express Checkout</MenubarItem>
              <MenubarSub>
                <MenubarSubTrigger>Share Cart Items</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Email link</MenubarItem>
                  <MenubarItem>Messages</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>
                Print... <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </header>
  );
}
