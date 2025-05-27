"use client";

import { useEffect, useState } from "react";
import { CookieIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

export default function CookieConsent({
  variant = "default",
  demo = false,
  onAcceptCallback = () => {},
  onDeclineCallback = () => {},
}) {
  const { isOpen, hide, accept, decline } = useCookieConsent({
    demo,
    onAcceptCallback,
    onDeclineCallback,
  });

  const [flashBorder, setFlashBorder] = useState(false);

  // Disable body scroll while banner is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFlashBorder(true);
    setTimeout(() => setFlashBorder(false), 1000);
  };

  const wrapperClass = cn(
    "fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700",
    isOpen
      ? "translate-y-0 opacity-100 pointer-events-auto"
      : "translate-y-8 opacity-0 pointer-events-none",
    hide && "hidden"
  );

  const cardBaseClass = cn(
    "border rounded-md m-3 shadow-lg transition-all",
    flashBorder && "border-red-500 animate-pulse",
    variant === "small" ? "rounded-lg" : "rounded-md",
    "border-border dark:bg-card bg-background"
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[199] bg-transparent"
          aria-hidden="true"
          onClick={handleOutsideClick}
        />
      )}

      <div
        className={wrapperClass}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
      >
        <div className={cardBaseClass}>
          {variant !== "small" ? (
            <div className="grid gap-2">
              <div className="border-b border-border h-14 flex items-center justify-between p-4">
                <h1 id="cookie-consent-title" className="text-lg font-medium">
                  We use cookies
                </h1>
                <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
              </div>
              <div className="p-4">
                <p className="text-sm font-normal text-start">
                  We use cookies to ensure you get the best experience on our
                  website. For more information on how we use cookies, please
                  see our cookie policy.
                  <br />
                  <br />
                  <span className="text-xs">
                    By clicking <q>Accept</q>, you agree to our use of cookies.
                  </span>
                  <br />
                  <a href="#" className="text-xs underline">
                    Learn more.
                  </a>
                </p>
              </div>
              <div className="flex flex-col gap-2 p-4 py-5 border-t border-border dark:bg-background/20">
                <Button onClick={accept} className="w-full">
                  Accept
                </Button>
                <Button
                  onClick={decline}
                  className="w-full"
                  variant="secondary"
                >
                  Decline
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between p-3">
                <h1 id="cookie-consent-title" className="text-lg font-medium">
                  We use cookies
                </h1>
                <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
              </div>
              <div className="p-3 -mt-2">
                <p className="text-sm text-left text-muted-foreground">
                  We use cookies to ensure you get the best experience on our
                  website. For more information on how we use cookies, please
                  see our cookie policy.
                </p>
              </div>
              <div className="p-3 flex flex-col items-center gap-2 mt-2 border-t">
                <Button onClick={accept} className="w-full h-9 rounded-full">
                  Accept
                </Button>
                <Button
                  onClick={decline}
                  className="w-full h-9 rounded-full"
                  variant="outline"
                >
                  Decline
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
