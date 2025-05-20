import { headers } from "next/headers"
import { ReactNode } from "react"
import AdminClients from "./clients/page"
import AdminDashboard from "./(components)/admin-dashboard"

const routeViews: Record<string, ReactNode> = {
  "/dashboard/clients": <AdminClients />,
  "/dashboard": <AdminDashboard />,
  "/analytics": <div>Analytics View</div>,
  "/projects": <div>Projects View</div>,
}

export default async function Page() {
  const pathname = (await headers()).get("x-next-url") || "/dashboard"

  const content =
    Object.entries(routeViews)
      .sort((a, b) => b[0].length - a[0].length) 
      .find(([path]) => pathname === path)?.[1] ?? routeViews["/dashboard"]

  return <>{content}</>
}