"use client";

import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { crimson, dawn, josefin } from "@/styles/fonts";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}`,
        skipBrowserRedirect: false,
      },
    });
  }
  return (
    <div className="flex flex-row items-center justify-center h-screen">
      <div>
        <h1
          className={`${dawn.className} text-[#74070E] flex justify item-center text-8xl`}
        >
          Welcome
        </h1>
        <div className=" mt-10 w-full">
          <Button
            variant="magnolia"
            className={cn(
              "w-full mb-6",
              crimson.className,
              "text-2xl border-[#74070E]",
            )}
            onClick={handleGoogleLogin}
          >
            Log in with Google
            <Image
              src="/images/google.png"
              alt="Google Icon"
              width={20}
              height={20}
            ></Image>
          </Button>
          <h3
            className={`${josefin.className} justify-content text-center text-[#74070E]`}
          >
            or
          </h3>
          <form onSubmit={handleLogin}>
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
                  <Link
                    href="/auth/forgot-password"
                    className={`text-sm ml-auto underline-offset-4 hover:underline text-[#74070E] ${josefin.className}`}
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="bg-[#74070E] text-white"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                variant="magnolia"
                type="submit"
                disabled={isLoading}
                className="w-1/2 mx-auto"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
            <div
              className={`mt-4 text-center text-sm text-[#74070E] ${josefin.className}`}
            >
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
