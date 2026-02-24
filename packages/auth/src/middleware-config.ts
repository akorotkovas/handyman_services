import type { NextAuthConfig } from "next-auth";

// Edge-compatible auth config (no Prisma, no bcrypt)
// Used only for middleware route protection
export const authMiddlewareConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [], // Providers checked only on actual auth, not middleware
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // Remove locale prefix for matching
      const pathWithoutLocale = pathname.replace(/^\/(lt|en)/, "") || "/";

      // Protected route prefixes
      const protectedPrefixes = ["/account", "/tradesperson"];
      const isProtected = protectedPrefixes.some((prefix) =>
        pathWithoutLocale.startsWith(prefix)
      );

      // Auth pages (login, register)
      const authPages = ["/login", "/register", "/forgot-password"];
      const isAuthPage = authPages.some((page) =>
        pathWithoutLocale.startsWith(page)
      );

      if (isProtected && !isLoggedIn) {
        return false; // Redirect to login
      }

      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
  },
};
