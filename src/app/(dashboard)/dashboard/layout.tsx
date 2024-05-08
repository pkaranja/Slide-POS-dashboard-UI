import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site"


export const metadata: Metadata = {
  title: siteConfig.name + " | Dashboard",
  description: siteConfig.description,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pt-16">{children}</main>
      </div>
    </>
  );
}
