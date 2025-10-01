import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { admin } from "better-auth/plugins";
import { ac, ADMIN, GUEST, STAFF } from "./permissions";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  trustedOrigins: ["http://localhost:3001", "myapp://"],
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              role: "GUEST",
            },
          };
        },
        after: async (user) => {
          console.log("New user created:", user.email, "with role:", user.role);
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    useSecureCookies: true,
    cookies: {
      session_token: {
        attributes: {
          sameSite: "none",
          secure: true,
        },
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7,
    },
  },
  plugins: [
    admin({
      ac,
      roles: {
        ADMIN,
        STAFF,
        GUEST,
      },
    }),
  ],
});

export const { getSession } = auth.api;
