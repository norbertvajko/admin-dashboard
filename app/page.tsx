'use client';

import Spinner from "@/components/ui/spinner";
import { useAuth } from "@/components/providers/auth-providers";
import { SignInBtn } from "@/components/sign-in-button";
import { Layout } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">

          {!isLoaded ? (
            <Button
              disabled
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            >
              <Spinner size={16} />
              Loading...
            </Button>
          ) : isSignedIn ? (
            <Link
              href="/dashboard"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            >
              <Layout className="w-4 h-4" />
              Go to dashboard
            </Link>
          ) : (
            <SignInBtn />
          )}
        </div>
      </main>
    </div>
  );
}
