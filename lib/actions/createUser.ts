import type { User } from "@clerk/nextjs/server";
import { db } from "../prisma";

export async function createUserIfNotExists(user: User) {
  if (!user) return null;

  const existing = await db.user.findUnique({ where: { clerkId: user.id } });
  if (existing) return existing;

  return await db.user.create({
    data: {
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      role: "USER",
    },
  });
}
