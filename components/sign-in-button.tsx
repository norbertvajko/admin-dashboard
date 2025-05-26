import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const SignInBtn = () => {
  return (
    <SignInButton mode="modal">
      <Button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
        Sign In
      </Button>
    </SignInButton>
  );
};
