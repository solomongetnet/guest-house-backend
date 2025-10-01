import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type RequireAuthOptions = {
  roles?: string[];
};

export async function requireAuth(
  options: RequireAuthOptions = {}
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return {
      session: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (options.roles && options.roles.length > 0 && session.user.role) {
    const userRole = session.user.role;
    const hasRole = options.roles.includes(userRole);

    if (!hasRole) {
      return {
        session,
        response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
      };
    }
  }

  return { session, response: null };
}
