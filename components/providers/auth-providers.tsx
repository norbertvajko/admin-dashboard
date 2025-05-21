"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { ClerkProvider, useUser } from "@clerk/clerk-react";

interface AuthContextType {
  user: ReturnType<typeof useUser>["user"];
  isSignedIn: boolean | undefined;
  isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <InnerAuthProvider>{children}</InnerAuthProvider>
    </ClerkProvider>
  );
};

const InnerAuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <AuthContext.Provider value={{ user, isSignedIn, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
