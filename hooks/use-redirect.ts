'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useRedirect(path: string) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const redirect = () => {
    setIsRedirecting(true);
    router.push(path);
  };

  return { isRedirecting, redirect };
}
