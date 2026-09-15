"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Search" },
  { href: "/tools", label: "All Tools" },
  { href: "/add", label: "Add New" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-black/5 bg-paper/90 backdrop-blur dark:border-white/10 dark:bg-[#0f0f12]/90">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span aria-hidden="true">🧠</span>
          <span>Life Hack Pull-Up</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  active
                    ? "bg-accent text-white"
                    : "text-ink/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
