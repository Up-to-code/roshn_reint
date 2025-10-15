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
  callbacks: {
    async session({ token, session }) {
      // Fix: Ensure session.user exists
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.image = token.picture as string;
      }

      return session;
    },

    async jwt({ token, user }) {
      // Fix: Handle initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      if (!token.sub) return token;

      try {
        const dbUser = await getUserById(token.sub);

        if (!dbUser) return token;

        return {
          ...token,
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
          role: dbUser.role,
        };
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },
  },
  ...authConfig,
});