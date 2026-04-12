"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface User {
  display_name: string;
  email: string;
  created_at: string;
}

const page = () => {
  const supabase = createClient();
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    async function getUserInfo() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      console.log("User data:", user);
      if (error) {
        console.error("Error fetching user info:", error);
        return;
      }
      setUserInfo({
        display_name: user?.user_metadata?.name || "No Name",
        email: user?.user_metadata?.email || "No Email",
        created_at: user?.created_at || "No Date",
      });
    }
    getUserInfo();
  }, [supabase]);

  return (
    <div className="flex flex-row items-center justify-center w-fill h-screen">
      <h1 className="text-[#74070E] text-3xl font-bold">
        Welcome {userInfo?.display_name}
      </h1>
    </div>
  );
};

export default page;
