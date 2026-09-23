"use client";

import { useRef, useState } from "react";
import { JOURNEY, QUESTION_GROUPS, type Phase } from "@/data/ashikaJourney";

const PHASE_STYLES: Record<Phase, { node: string; badge: string; panel: string }> = {
  Attract: {
    node: "bg-skytint",
    badge: "bg-skytint text-ink",
    panel: "from-skytint-soft to-skytint",
  },
  Engage: {
    node: "bg-lavender",
    badge: "bg-lavender text-ink",
    panel: "from-lavender-soft to-lavender",
  },
  Convert: {
    node: "bg-peach",
    badge: "bg-peach text-ink",
    panel: "from-peach-soft to-peach",
  },
  Advocate: {
    node: "bg-mintto",
    badge: "bg-mintto text-ink",
    panel: "from-mintfrom to-mintto",
  },
};

// Vertical position (% from top) of each stage, tracing the arc from the whiteboard sketch.
const NODE_Y = [62, 74, 48, 26, 22, 18, 20, 24, 34, 52, 70];
const nodeX = (i: number) => 6 + (i * 88) / (JOURNEY.length - 1);

export default function JourneyMap() {
  const [activeId, setActiveId] = useState(1);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = JOURNEY.find((s) => s.id === activeId) ?? JOURNEY[0];
  const style = PHASE_STYLES[stage.phase];

  const go = (index: number) => {
    const clamped = Math.max(0, Math.min(JOURNEY.length - 1, index));
    setActiveId(JOURNEY[clamped].id);
    return clamped;
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = go(index + (e.key === "ArrowRight" ? 1 : -1));
    buttons.current[next]?.focus();
  };

  const path = JOURNEY.map((_, i) => `${i === 0 ? "M" : "L"} ${nodeX(i)} ${NODE_Y[i]}`).join(" ");

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold">
        {(Object.keys(PHASE_STYLES) as Phase[]).map((phase) => (
          <span key={phase} className={`rounded-full px-3 py-1 ${PHASE_STYLES[phase].badge}`}>
            {phase}
          </span>
        ))}
        <span className="ml-auto text-ink/50 dark:text-white/50 sm:hidden">Swipe to see all 11 →</span>
        <span className="ml-auto hidden text-ink/50 dark:text-white/50 sm:inline">
          Hover, tap or use ← → to explore each stage
        </span>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        <div
          role="tablist"
          aria-label="User journey stages"
          className="relative h-[250px] min-w-[820px] rounded-4xl border border-black/5 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-[#1b1a20]"
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full text-ink/30 dark:text-white/30"
            aria-hidden="true"
          >
            <path
              d={path}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {JOURNEY.map((s, i) => {
            const active = s.id === activeId;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                role="tab"
                aria-selected={active}
                aria-controls="journey-panel"
                tabIndex={active ? 0 : -1}
                onMouseEnter={() => setActiveId(s.id)}
                onFocus={() => setActiveId(s.id)}
                onClick={() => setActiveId(s.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                style={{ left: `${nodeX(i)}%`, top: `${NODE_Y[i]}%` }}
                className="group absolute flex w-20 -translate-x-1/2 -translate-y-[22px] flex-col items-center text-center focus:outline-none"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-ink font-display text-lg font-bold text-ink transition-all duration-200 dark:border-white ${
                    PHASE_STYLES[s.phase].node
                  } ${
                    active
                      ? "scale-125 shadow-[0_0_0_6px_rgba(232,105,79,0.35)]"
                      : "group-hover:scale-110 group-focus-visible:ring-4 group-focus-visible:ring-accent/50"
                  }`}
                >
                  {s.id}
                </span>
                <span
                  className={`mt-3 text-[11px] font-bold uppercase leading-tight tracking-wide transition-colors ${
                    active ? "text-accent" : "text-ink/70 dark:text-white/70"
                  }`}
                >
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <section
        id="journey-panel"
        role="tabpanel"
        aria-live="polite"
        className={`mt-6 rounded-5xl bg-gradient-to-br px-5 py-7 text-ink sm:px-10 sm:py-9 ${style.panel}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">
                Stage {stage.id} of {JOURNEY.length}
              </span>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold">{stage.phase}</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">{stage.name}</h2>
            <p className="mt-1 text-ink/70">{stage.summary}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => go(JOURNEY.indexOf(stage) - 1)}
              disabled={stage.id === JOURNEY[0].id}
              className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold transition hover:bg-white disabled:opacity-40"
              aria-label="Previous stage"
            >
              ← Prev
            </button>
            <button
              onClick={() => go(JOURNEY.indexOf(stage) + 1)}
              disabled={stage.id === JOURNEY[JOURNEY.length - 1].id}
              className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink/85 disabled:opacity-40"
              aria-label="Next stage"
            >
              Next →
            </button>
          </div>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {QUESTION_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-ink/50">{group.title}</h3>
              <dl className="space-y-3">
                {group.questions.map((q) => (
                  <div key={q.key} className="rounded-3xl bg-white/80 p-4 shadow-sm">
                    <dt className="font-display text-sm font-bold text-accent">{q.label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink/85">{stage.answers[q.key]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
