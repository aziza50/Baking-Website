"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { crimson } from "../styles/fonts";
import LogOutButton from "./logout-button";
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
interface AuthUser {
  id: string;
  email: string;
  created_at: string;
}

export default function Navbar() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function syncUser() {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      setUser(
        authUser
          ? {
              id: authUser.id,
              email: authUser.email ?? "",
              created_at: authUser.created_at,
            }
          : null,
      );
      setLoading(false);
    }

    syncUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const authUser = session?.user ?? null;

      setUser(
        authUser
          ? {
              id: authUser.id,
              email: authUser.email ?? "",
              created_at: authUser.created_at,
            }
          : null,
      );
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  const isAuthenticated = !!user;

  return (
    <header className="fixed top-10 left-0 right-0 z-50 mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center rounded-[2rem] bg-[#74070E] px-8 py-3 opacity-200">
      <div className="shrink-0 justify-self-start">
        <Link href="/">
          <Image
            src="/images/MKLogo.png"
            alt="Magnolia Kitchen"
            height={50}
            width={200}
            sizes="100vw"
            style={{ width: "auto", height: "50px" }}
          />
        </Link>
      </div>

      <nav
        className={`justify-self-center flex gap-x-8 text-white ${crimson.className} text-lg`}
      >
        <Link
          href="/"
          className="border-y-2 border-transparent px-1 duration-100 hover:border-white"
        >
          Home
        </Link>
        <Link
          href="/menu/collection"
          className="border-y-2 border-transparent px-1 duration-100 hover:border-white"
        >
          Menu
        </Link>
        <Link
          href="/portfolio"
          className="border-y-2 border-transparent px-1 duration-100 hover:border-white"
        >
          Portfolio
        </Link>
      </nav>

      <div className="justify-self-end flex items-center">
        <Menubar className="border-none bg-transparent">
          <MenubarMenu>
            <MenubarTrigger>
              <User color="white" strokeWidth={1} />
            </MenubarTrigger>
            <MenubarContent>
              {isAuthenticated && (
                <MenubarItem>
                  <Link href="/user/profile">Profile</Link>
                </MenubarItem>
              )}
              <MenubarItem>
                {isAuthenticated ? (
                  <LogOutButton />
                ) : (
                  <Link href="/auth/login">Login</Link>
                )}
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <Link href="/checkout/shopping_cart">
              <MenubarTrigger>
                <ShoppingCart color="white" strokeWidth={1} />
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
