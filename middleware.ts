import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  
  
  // Optional: Custom handling for protected routes
  afterAuth(auth, req) {
    // Check if the user is trying to access /dashboard without authentication
    if (!auth.userId && req.nextUrl.pathname.startsWith('/dashboard')) {
      const signInUrl = new URL('/sign-in', req.url);
      // Store the dashboard URL as redirect_url to return after sign in
      signInUrl.searchParams.set('redirect_url', req.url);
      return Response.redirect(signInUrl);
    }
  },
});
 
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
    "/",
  ],
};