import type { Metadata } from "next";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Life Hack Pull-Up",
  description: "Search your life hacks, tools, and internet hidden gems by need, use, context, or keyword.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-paper font-sans text-ink dark:bg-[#0f0f12] dark:text-white">
        <Nav />
        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">{children}</main>
      </body>
    </html>
  );
}
