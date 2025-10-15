// FILE: auth.ts
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/db";
import { getUserById, getUserByEmail } from "@/lib/user";

// Fix: Proper module augmentation
declare module "next-auth" {
  interface User {
    id: string;
    role?: UserRole;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
}

// Note: The correct module to augment is "next-auth" (not "next-auth/jwt")
declare module "next-auth" {
  interface JWT {
    id: string;
    role?: UserRole;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Fix: Proper type checking for credentials
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const email = credentials.email as string;
          const password = credentials.password as string;

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          const isPasswordValid = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid credentials");
          }

          // Fix: Return user with proper typing
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
// In your auth.ts, make sure you have these callbacks:
callbacks: {
  async session({ token, session }) {
    if (session.user) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      session.user.name = token.name;
      session.user.email = token.email as string;
      session.user.image = token.picture as string;
      
      if (token.role) {
        session.user.role = token.role as UserRole;
      }
    }
    return session;
  },

  async jwt({ token, user }) {
    if (user) {
      token.role = user.role;
    }
    
    if (!token.sub) return token;

    const dbUser = await getUserById(token.sub);
    if (dbUser) {
      token.role = dbUser.role;
    }

    return token;
  },

  async redirect({ url, baseUrl }) {
    // Redirect to dashboard after successful sign in
    if (url.startsWith(baseUrl)) return url;
    if (url.startsWith('/')) return `${baseUrl}${url}`;
    return baseUrl;
  },
},
  ...authConfig,
});