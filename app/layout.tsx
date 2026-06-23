import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Argentina 2026 Hub",
  description: "המדריך האישי לטיול בארגנטינה 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full`}>
      <body className="min-h-full flex flex-col font-heebo bg-white text-navy antialiased">
        <Navbar />
        <div className="flex-1 pt-14">
          {children}
        </div>
      </body>
    </html>
  );
}
