import { currentUser } from "@clerk/nextjs/server";
import { createUserIfNotExists } from "@/lib/createUser";
import AdminMainView from "./(components)/admin-main-view";

export default async function DashboardPage() {
  const user = await currentUser();

  if (user) {
    await createUserIfNotExists(user);
  }

  return <AdminMainView />;
}