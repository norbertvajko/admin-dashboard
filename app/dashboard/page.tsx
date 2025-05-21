import { createUserIfNotExists } from "@/lib/createUser";
import AdminMainView from "./(components)/admin-main-view";

export default async function DashboardPage() {
  await createUserIfNotExists();

  return <AdminMainView />;
}
