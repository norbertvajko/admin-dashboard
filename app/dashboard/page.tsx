import { currentUser } from "@clerk/nextjs/server";
import { createUserIfNotExists } from "@/lib/actions/createUser";
import dynamic from "next/dynamic";
import { AdminMainViewSkeleton } from "./(components)/admin-main-view/admin-main-view-skeleton";

// Dynamically import with a loading component
const AdminMainView = dynamic(() => import("./(components)/admin-main-view/admin-main-view"), {
  loading: () => <div className="p-8"><AdminMainViewSkeleton /></div>,
});

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (user) {
    await createUserIfNotExists(user);
  }

  return <AdminMainView />;
}
