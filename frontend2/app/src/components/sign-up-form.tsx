"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { dawn, josefin } from "@/styles/fonts";
import { addUser } from "@/services/users";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      //add user to database
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user && user.id && user.email) {
        const response = await addUser({
          id: user.id,
          email: user.email,
        });
        if (!response.ok) {
          throw new Error("Failed to add user to database");
        }
      }
      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center h-screen">
      <div>
        <h1
          className={`${dawn.className} text-[#74070E] flex justify item-center text-8xl`}
        >
          Welcome
        </h1>
        <div className=" mt-10 w-full  ">
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label
                  className={`${josefin.className} text-[#74070E]`}
                  htmlFor="email"
                >
                  email
                </Label>
                <Input
                  className="bg-[#74070E] text-white"
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label
                    className={`${josefin.className} text-[#74070E]`}
                    htmlFor="password"
                  >
                    password
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="bg-[#74070E] text-white"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="repeat-password">Repeat Password</Label>
                  </div>
                  <Input
                    id="repeat-password"
                    type="password"
                    required
                    className="bg-[#74070E] text-white"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                variant="magnolia"
                type="submit"
                disabled={isLoading}
                className="w-1/2 mx-auto"
              >
                {isLoading ? "Signing up..." : "Sign up"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-[#74070E]">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
