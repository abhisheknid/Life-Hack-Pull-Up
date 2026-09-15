"use client";

import { useEffect, useMemo, useState } from "react";
import HackCard from "@/components/HackCard";
import type { Hack } from "@/lib/types";

export default function HomePage() {
  const [hacks, setHacks] = useState<Hack[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("/api/hacks")
      .then((r) => r.json())
      .then((data) => setHacks(data.hacks ?? []))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const set = new Set(hacks.map((h) => h.category));
    return ["All", ...Array.from(set).sort()];
  }, [hacks]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hacks.filter((h) => {
      if (category !== "All" && h.category !== category) return false;
      if (!q) return true;
      const haystack = [h.name, h.purpose, h.context, h.category, ...h.tags, ...h.pickTags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [hacks, query, category]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Find the right hack, right now.</h1>
        <p className="mt-1 text-sm text-ink/60 dark:text-white/60">
          Search by what you need, what it's for, or a keyword — e.g. "focus", "password", "cook", "learn".
        </p>
      </div>

      <div className="sticky top-[57px] z-[5] -mx-4 bg-paper/95 px-4 py-3 backdrop-blur dark:bg-[#0f0f12]/95 sm:-mx-6 sm:px-6">
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search hacks, tools, and gems…"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base outline-none ring-accent/30 placeholder:text-ink/30 focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:placeholder:text-white/30"
        />
        <div className="mt-3 flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                category === c
                  ? "border-accent bg-accent text-white"
                  : "border-black/10 bg-white text-ink/70 hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        {loading ? (
          <p className="text-sm text-ink/50 dark:text-white/50">Loading…</p>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/15 p-8 text-center text-sm text-ink/50 dark:border-white/15 dark:text-white/50">
            No matches. Try a different keyword, or{" "}
            <a href="/add" className="text-accent hover:underline">
              add it yourself
            </a>
            .
          </div>
        ) : (
          <>
            <p className="mb-3 text-xs text-ink/40 dark:text-white/40">
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {filtered.map((h) => (
                <HackCard key={h.id} hack={h} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
