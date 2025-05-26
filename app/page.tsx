'use client';

import Spinner from "@/components/ui/spinner";
import { useAuth } from "@/components/providers/auth-providers";
import { SignInBtn } from "@/components/sign-in-button";
import { Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRedirect } from "@/hooks/use-redirect";

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const { isRedirecting, redirect } = useRedirect("/dashboard");

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
            <Button
              onClick={redirect}
              disabled={isRedirecting}
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            >
              {isRedirecting ? (
                <>
                  <Spinner size={16} />
                  Redirecting...
                </>
              ) : (
                <>
                  <Layout className="w-4 h-4" />
                  Go to dashboard
                </>
              )}
            </Button>
          ) : (
            <SignInBtn />
          )}
        </div>
      </main>
    </div>
  );
}
