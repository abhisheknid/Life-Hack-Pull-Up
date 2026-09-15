"use client";

import { useEffect, useMemo, useState } from "react";
import HackCard from "@/components/HackCard";
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">All Tools</h1>
        <p className="mt-1 text-sm text-ink/60 dark:text-white/60">
          Every tool and resource, grouped by category, with its purpose and link.
        </p>
      </div>

      {!loading && grouped.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-1.5">
          {grouped.map(([cat, items]) => (
            <a
              key={cat}
              href={`#${slugify(cat)}`}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${categoryColor(cat)}`}
            >
              {cat} <span className="opacity-60">({items.length})</span>
            </a>
          ))}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-ink/50 dark:text-white/50">Loading…</p>
      ) : (
        <div className="space-y-10">
          {grouped.map(([cat, items]) => (
            <section key={cat} id={slugify(cat)} className="scroll-mt-32">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
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
