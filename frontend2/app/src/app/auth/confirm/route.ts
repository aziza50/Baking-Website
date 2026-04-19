import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import GetUserInfo from "@/components/get_user_info";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const _next = searchParams.get("next");
  const next = _next?.startsWith("/") ? _next : "/";
  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      const userInfo = GetUserInfo();
      if (!userInfo) {
        redirect(`/auth/error?error=User information is undefined`);
      }

      //also see if user exists in the database
      const curr_user = await supabase.auth.getUser();
      const allUsers = await fetch("/api/users/get-users");
      console.log("Current user:", curr_user);
      console.log("All users response:", allUsers);
      const users = await allUsers.json();
      console.log(users);
      const userExists = users.some(
        (user: any) => user.id === curr_user.data.user?.id,
      );
      if (!userExists) {
        console.log("User does not exist, adding to database");
        //if user doesn't exist, add them to the database
        await fetch("/api/users/add-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        });
      }
      redirect(next);
    } else {
      // redirect the user to an error page with some instructions
      redirect(`/auth/error?error=${encodeURIComponent(error.message)}`);
    }
  } else {
    // redirect the user to an error page with some instructions
    redirect(`/auth/error?error=Missing token hash or type`);
  }
}
