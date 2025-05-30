import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req))
    // auth.protect() redirects unauthenticated users to the Clerk default sign-in page 
    await auth.protect();
});

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    "/((?!_next|.*\\..*|favicon.ico).*)",
    // Always run middleware on API routes
    "/(api|trpc)(.*)",
  ],
};
