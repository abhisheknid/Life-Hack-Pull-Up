"use client";

import { useEffect, useMemo, useState } from "react";
import HackCard from "@/components/HackCard";
import { Spark } from "@/components/Doodles";
import { categoryColor } from "@/lib/categoryColors";
import type { Hack } from "@/lib/types";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ToolsPage() {
  const [hacks, setHacks] = useState<Hack[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch("/api/hacks")
      .then((r) => r.json())
      .then((data) => setHacks(data.hacks ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, Hack[]>();
    for (const h of hacks) {
      if (!map.has(h.category)) map.set(h.category, []);
      map.get(h.category)!.push(h);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [hacks]);

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this entry?")) return;
    const prev = hacks;
    setHacks(hacks.filter((h) => h.id !== id));
    const res = await fetch(`/api/hacks/${id}`, { method: "DELETE" });
    if (!res.ok) setHacks(prev);
  };

  return (
    <div>
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-mintfrom to-mintto px-6 py-10 sm:px-12 sm:py-12">
        <div className="pointer-events-none absolute -left-8 -bottom-10 h-40 w-40 rounded-full bg-white/25 sm:h-52 sm:w-52" />
        <div className="relative">
          <h1 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            All Tools
            <Spark className="ml-1 inline h-5 w-5 align-top text-accent sm:h-6 sm:w-6" />
          </h1>
          <p className="mt-2 max-w-lg text-sm text-ink/70 sm:text-base">
            Every tool and resource, grouped by category, with its purpose and link.
          </p>

          {!loading && grouped.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {grouped.map(([cat, items]) => (
                <a
                  key={cat}
                  href={`#${slugify(cat)}`}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold sm:text-sm ${categoryColor(cat)}`}
                >
                  {cat} <span className="opacity-60">({items.length})</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {loading ? (
        <p className="mt-8 text-sm text-ink/50 dark:text-white/50">Loading…</p>
      ) : (
        <div className="mt-10 space-y-12">
          {grouped.map(([cat, items]) => (
            <section key={cat} id={slugify(cat)} className="scroll-mt-32">
              <h2 className="mb-3 flex items-center gap-2 px-1 font-display text-lg font-bold">
                {cat}
                <span className="text-sm font-normal text-ink/40 dark:text-white/40">
                  {items.length}
                </span>
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((h) => (
                  <HackCard key={h.id} hack={h} onDelete={handleDelete} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
