import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { createUserIfNotExists } from "@/lib/actions/createUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();

  // Ensure user exists
  await createUserIfNotExists(user);

  // Now update only the consent-related info
  await db.user.update({
    where: { clerkId: user.id },
    data: {
      info: body.userInfo,
    },
  });

  return NextResponse.json({ success: true });
}