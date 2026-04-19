"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    try {
      await supabase.auth.signOut();
      router.push("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return <button onClick={logout}>Logout</button>;
}
