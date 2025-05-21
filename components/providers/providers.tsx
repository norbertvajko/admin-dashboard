"use client";

import { ReactNode } from "react";
import { QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { AuthProvider } from "./auth-providers";

function ErrorFallback() {
  return (
    <div className="p-4 text-red-600 text-center">
      <p>
        <strong>Something went wrong.</strong>
      </p>
      <p>Please try refreshing the page.</p>
    </div>
  );
}

export function Providers({
  children,
  dehydratedState,
}: {
  children: ReactNode;
  dehydratedState?: unknown;
}) {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <AuthProvider>
            {children}
            {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
          </AuthProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
