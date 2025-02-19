import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  afterAuth(auth, req) {
    if (!auth.userId && req.nextUrl.pathname.startsWith("/dashboard")) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.nextUrl.pathname);
      return Response.redirect(signInUrl.toString());
    }
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
