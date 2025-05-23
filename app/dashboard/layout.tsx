import { ReactNode } from "react";
import type { Metadata } from "next";
import { DashboardWrapper } from "./(components)/dahsboard-wrapper";

export const metadata: Metadata = {
  title: "Dashboard | YourAppName",
  description:
    "Access your personal dashboard, manage settings, and monitor your activity.",
  robots: "noindex, nofollow",
  openGraph: {
    title: "Dashboard | YourAppName",
    description: "Your personalized dashboard on YourAppName.",
    url: "https://yourapp.com/dashboard",
    siteName: "YourAppName",
    images: [
      {
        url: "https://yourapp.com/images/dashboard-preview.png",
        width: 1200,
        height: 630,
        alt: "Dashboard Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard | YourAppName",
    description: "Your personalized dashboard on YourAppName.",
    images: ["https://yourapp.com/images/dashboard-preview.png"],
  },
};

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;

  return <DashboardWrapper>{children}</DashboardWrapper>;
}
