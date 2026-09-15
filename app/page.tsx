"use client";

import { useEffect, useMemo, useState } from "react";
import HackCard from "@/components/HackCard";
import { Spark, ScribbleCircle } from "@/components/Doodles";
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
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-lavender-soft to-lavender px-6 py-10 sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/25 sm:h-56 sm:w-56" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-5xl">
            Find the right{" "}
            <span className="underline-scribble relative inline-block">
              hack
              <ScribbleCircle className="text-accent" />
            </span>
            , right now
            <Spark className="ml-1 inline h-5 w-5 align-top text-accent sm:h-7 sm:w-7" />
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm text-ink/70 sm:text-base">
            Search by what you need, what it&rsquo;s for, or a keyword — try &ldquo;focus&rdquo;,
            &ldquo;password&rdquo;, &ldquo;cook&rdquo;, or &ldquo;learn&rdquo;.
          </p>

          <div className="mt-8">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hacks, tools, and gems…"
              className="w-full rounded-full border-0 bg-white px-6 py-4 text-center text-base font-medium text-ink shadow-[0_8px_24px_rgba(0,0,0,0.08)] outline-none ring-accent/30 placeholder:text-ink/30 focus:ring-2 sm:text-lg"
            />
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                  category === c
                    ? "border-ink bg-ink text-white"
                    : "border-black/10 bg-white/70 text-ink/70 hover:bg-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8">
        {loading ? (
          <p className="text-sm text-ink/50 dark:text-white/50">Loading…</p>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-black/15 p-10 text-center text-sm text-ink/50 dark:border-white/15 dark:text-white/50">
            No matches. Try a different keyword, or{" "}
            <a href="/add" className="font-semibold text-accent hover:underline">
              add it yourself
            </a>
            .
          </div>
        ) : (
          <>
            <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wide text-ink/40 dark:text-white/40">
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
