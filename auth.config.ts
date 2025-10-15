// FILE: auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [], // already configured in auth.ts
  callbacks: {
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token }) {
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect to login page
      }
      
      return true;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;