import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const createUserIfNotExists = async () => {
  const user = await currentUser();
  if (!user) return;

  const existing = await db.user.findUnique({ where: { clerkId: user.id } });
  if (existing) return;

  await db.user.create({
    data: {
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    },
  });
};
