import React from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export function Logout() {
  const router = useRouter();
  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };
}

export default Logout;
