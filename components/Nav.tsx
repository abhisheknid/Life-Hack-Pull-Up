"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PillButton } from "@/components/PillButton";

const LINKS = [
  { href: "/", label: "Search" },
  { href: "/tools", label: "All Tools" },
];

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" className="h-3.5 w-3.5">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-3 z-20 px-3 pt-3 sm:top-4 sm:px-6">
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border border-black/5 bg-white/90 px-3 py-2 shadow-[0_2px_20px_rgba(0,0,0,0.06)] backdrop-blur dark:border-white/10 dark:bg-[#1b1a20]/90">
        <Link href="/" className="flex shrink-0 items-center gap-1.5 pl-2 font-display text-lg font-bold tracking-tight">
          <span aria-hidden="true">🧠</span>
          <span className="hidden sm:inline">Life Hack Pull-Up</span>
          <span className="sm:hidden">LHPU</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-semibold">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 transition-colors sm:px-4 ${
                  active
                    ? "bg-ink text-white dark:bg-white dark:text-ink"
                    : "text-ink/60 hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <PillButton href="/add" variant="accent" icon={<PlusIcon />} className="shrink-0">
          Add New
        </PillButton>
      </header>
    </div>
  );
}
