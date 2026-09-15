"use client";

import { categoryColor } from "@/lib/categoryColors";
import type { Hack } from "@/lib/types";

function hostFromUrl(url: string): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function HackCard({
  hack,
  onDelete,
}: {
  hack: Hack;
  onDelete?: (id: number) => void;
}) {
  return (
    <div className="group rounded-3xl border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-display text-base font-bold">{hack.name}</h3>
            <span
              className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${categoryColor(
                hack.category
              )}`}
            >
              {hack.category}
            </span>
          </div>
          {hack.url ? (
            <a
              href={hack.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block truncate text-sm font-semibold text-accent hover:underline"
            >
              {hostFromUrl(hack.url)} ↗
            </a>
          ) : (
            <span className="mt-1 inline-block text-sm italic text-ink/40 dark:text-white/40">
              no link yet
            </span>
          )}
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(hack.id)}
            aria-label={`Delete ${hack.name}`}
            className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold text-ink/40 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 dark:text-white/40 dark:hover:bg-red-950"
          >
            Delete
          </button>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink/80 dark:text-white/80">{hack.purpose}</p>

      {hack.context && (
        <p className="mt-2 text-sm leading-relaxed text-ink/50 dark:text-white/50">
          <span className="font-semibold text-ink/65 dark:text-white/65">Use it when: </span>
          {hack.context}
        </p>
      )}

      {(hack.tags.length > 0 || hack.pickTags.length > 0) && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {hack.pickTags.map((p) => (
            <span
              key={p}
              className="rounded-full bg-peach px-2.5 py-0.5 text-xs font-semibold text-amber-800"
            >
              ⭐ {p}
            </span>
          ))}
          {hack.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-black/5 px-2.5 py-0.5 text-xs font-medium text-ink/60 dark:bg-white/10 dark:text-white/60"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
