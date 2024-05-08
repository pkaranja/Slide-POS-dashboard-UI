import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import { Theme } from '@radix-ui/themes'
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slide POS Dashboard",
  description: "Business tools for small merchants",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.className} overflow-hidden`}>
        <Theme>
          <Providers session={session}>
            <Toaster />
            {children}
          </Providers>
        </Theme>
      </body>
    </html>
  );
}
