import type { Metadata } from "next";

import Header from "@/components/header";

export const metadata: Metadata = {
  title: "FSW Barber",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
