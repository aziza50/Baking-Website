"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface User {
  id: string;
  display_name: string;
  email: string;
  created_at: string;
}

export default function GetUserInfo() {
  const supabase = createClient();
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    async function getUserInfo() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user info:", error);
        return;
      }
      setUserInfo({
        id: user?.id || "No ID",
        display_name: user?.user_metadata?.name || "No Name",
        email: user?.user_metadata?.email || "No Email",
        created_at: user?.created_at || "No Date",
      });
    }
    getUserInfo();
  }, []);

  return userInfo;
}
