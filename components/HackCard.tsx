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
    <div className="group rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold">{hack.name}</h3>
            <span
              className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${categoryColor(
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
              className="mt-0.5 inline-block truncate text-sm text-accent hover:underline"
            >
              {hostFromUrl(hack.url)} ↗
            </a>
          ) : (
            <span className="mt-0.5 inline-block text-sm italic text-ink/40 dark:text-white/40">
              no link yet
            </span>
          )}
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(hack.id)}
            aria-label={`Delete ${hack.name}`}
            className="shrink-0 rounded-full px-2 py-1 text-xs text-ink/40 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 dark:text-white/40 dark:hover:bg-red-950"
          >
            Delete
          </button>
        )}
      </div>

      <p className="mt-2 text-sm text-ink/80 dark:text-white/80">{hack.purpose}</p>

      {hack.context && (
        <p className="mt-1.5 text-sm text-ink/50 dark:text-white/50">
          <span className="font-medium text-ink/60 dark:text-white/60">Use it when: </span>
          {hack.context}
        </p>
      )}

      {(hack.tags.length > 0 || hack.pickTags.length > 0) && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {hack.pickTags.map((p) => (
            <span
              key={p}
              className="rounded-full bg-amber-400/20 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400"
            >
              ⭐ {p}
            </span>
          ))}
          {hack.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-black/5 px-2 py-0.5 text-xs text-ink/60 dark:bg-white/10 dark:text-white/60"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
