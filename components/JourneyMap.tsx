"use client";

import { useEffect, useRef, useState } from "react";
import { JOURNEY, QUESTION_GROUPS, type Phase } from "@/data/ashikaJourney";

const PHASES: Phase[] = ["Attract", "Engage", "Convert", "Advocate"];

const PHASE_STYLES: Record<Phase, { node: string; chip: string; band: string }> = {
  Attract: { node: "bg-ash-peach text-ash-deep", chip: "bg-ash-peach text-ash-deep", band: "from-ash-blush to-ash-peach" },
  Engage: { node: "bg-ash-apricot text-ash-deep", chip: "bg-ash-apricot text-ash-deep", band: "from-ash-peach to-ash-apricot" },
  Convert: { node: "bg-ash-coral text-white", chip: "bg-ash-coral text-white", band: "from-ash-apricot to-ash-coral" },
  Advocate: { node: "bg-ash-mist text-ash-deep", chip: "bg-ash-mist text-ash-deep", band: "from-ash-mist to-ash-apricot" },
};

const GROUP_ICONS = ["✦", "⚙", "♡"];

// Vertical position (% from top) of each stage, tracing the arc from the whiteboard sketch.
const NODE_Y = [60, 72, 46, 26, 21, 17, 19, 23, 33, 50, 68];
const nodeX = (i: number) => 5 + (i * 90) / (JOURNEY.length - 1);

export default function JourneyMap() {
  const [index, setIndex] = useState(0);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stripRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const stage = JOURNEY[index];
  const style = PHASE_STYLES[stage.phase];

  const go = (next: number) => {
    const clamped = Math.max(0, Math.min(JOURNEY.length - 1, next));
    setIndex(clamped);
    return clamped;
  };

  // Keep the active chip centred in the mobile stepper without moving the page vertically.
  useEffect(() => {
    const strip = stripRef.current;
    const chip = chipRefs.current[index];
    if (!strip || !chip) return;
    strip.scrollTo({ left: chip.offsetLeft - strip.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }, [index]);

  const onKeyDown = (e: React.KeyboardEvent, refs: (HTMLButtonElement | null)[]) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    refs[go(index + (e.key === "ArrowRight" ? 1 : -1))]?.focus();
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(index + (dx < 0 ? 1 : -1));
  };

  // Bottom-of-card navigation: also bring the top of the new stage back into view.
  const stepAndReveal = (delta: number) => {
    go(index + delta);
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const path = JOURNEY.map((_, i) => `${i === 0 ? "M" : "L"} ${nodeX(i)} ${NODE_Y[i]}`).join(" ");

  return (
    <div className="mt-8">
      {/* Phase legend */}
      <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-5 sm:px-8">
        {PHASES.map((phase) => (
          <span key={phase} className={`rounded-full px-3 py-1 text-xs font-bold ${PHASE_STYLES[phase].chip}`}>
            {phase}
          </span>
        ))}
      </div>

      {/* Desktop: the journey curve */}
      <div className="mx-auto hidden max-w-6xl px-8 md:block">
        <div
          role="tablist"
          aria-label="User journey stages"
          className="relative mt-6 h-[330px] rounded-[2.5rem] bg-ash-deep/60 ring-1 ring-white/10"
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full text-ash-peach/50"
            aria-hidden="true"
          >
            <path d={path} fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="7 7" vectorEffect="non-scaling-stroke" />
          </svg>

          {JOURNEY.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                role="tab"
                aria-selected={active}
                aria-controls="journey-panel"
                tabIndex={active ? 0 : -1}
                onMouseEnter={() => setIndex(i)}
                onFocus={() => setIndex(i)}
                onClick={() => setIndex(i)}
                onKeyDown={(e) => onKeyDown(e, nodeRefs.current)}
                style={{ left: `${nodeX(i)}%`, top: `${NODE_Y[i]}%` }}
                className="group absolute flex w-24 -translate-x-1/2 -translate-y-7 flex-col items-center text-center focus:outline-none"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full border-4 font-display text-xl font-extrabold transition-all duration-200 ${
                    PHASE_STYLES[s.phase].node
                  } ${
                    active
                      ? "scale-[1.3] border-white shadow-[0_0_0_8px_rgba(238,106,80,0.45),0_12px_30px_rgba(0,0,0,0.35)]"
                      : "border-ash-teal group-hover:scale-110 group-focus-visible:ring-4 group-focus-visible:ring-ash-coral"
                  }`}
                >
                  {s.id}
                </span>
                <span
                  className={`mt-4 text-[11px] font-bold uppercase leading-tight tracking-wider transition-colors ${
                    active ? "text-ash-peach" : "text-white/70 group-hover:text-white"
                  }`}
                >
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile: sticky stage stepper */}
      <div className="sticky top-0 z-30 mt-5 bg-ash-teal/95 pb-3 pt-3 shadow-[0_10px_20px_-12px_rgba(0,0,0,0.5)] backdrop-blur md:hidden">
        <div
          ref={stripRef}
          role="tablist"
          aria-label="User journey stages"
          className="flex snap-x gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {JOURNEY.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  chipRefs.current[i] = el;
                }}
                role="tab"
                aria-selected={active}
                aria-controls="journey-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setIndex(i)}
                onKeyDown={(e) => onKeyDown(e, chipRefs.current)}
                className={`flex min-h-11 shrink-0 snap-center items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-bold transition-colors ${
                  active ? "bg-white text-ash-deep" : "bg-white/10 text-white/80"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-extrabold ${
                    PHASE_STYLES[s.phase].node
                  }`}
                >
                  {s.id}
                </span>
                <span className="whitespace-nowrap">{s.name}</span>
              </button>
            );
          })}
        </div>
        <div className="mx-5 mt-2 h-1 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
          <div
            className="h-full rounded-full bg-ash-coral transition-all duration-300"
            style={{ width: `${((index + 1) / JOURNEY.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Stage detail */}
      <div className="mx-auto max-w-6xl px-3 sm:px-8">
        <section
          ref={panelRef}
          id="journey-panel"
          role="tabpanel"
          aria-live="polite"
          onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
          onTouchEnd={onTouchEnd}
          className="mt-5 scroll-mt-24 overflow-hidden rounded-[2rem] bg-ash-cream text-ash-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] md:mt-8 md:rounded-[2.5rem]"
        >
          <div className={`bg-gradient-to-br px-5 pb-6 pt-6 sm:px-10 sm:pb-8 sm:pt-9 ${style.band}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-ash-deep px-3 py-1 text-xs font-bold text-white">
                    Stage {stage.id} / {JOURNEY.length}
                  </span>
                  <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-ash-deep">{stage.phase}</span>
                </div>
                <h3 className="mt-3 font-display text-[2rem] font-extrabold leading-tight text-ash-deep sm:text-5xl">
                  {stage.name}
                </h3>
                <p className="mt-1 text-base text-ash-deep/75 sm:text-lg">{stage.summary}</p>
              </div>
              <span
                className="hidden font-display text-8xl font-extrabold leading-none text-white/50 sm:block lg:text-9xl"
                aria-hidden="true"
              >
                {String(stage.id).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="grid gap-6 px-4 py-6 sm:px-10 sm:py-9 lg:grid-cols-3">
            {QUESTION_GROUPS.map((group, g) => (
              <div key={group.title}>
                <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ash-teal">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ash-mist text-[13px]" aria-hidden="true">
                    {GROUP_ICONS[g]}
                  </span>
                  {group.title}
                </h4>
                <dl className="space-y-3">
                  {group.questions.map((q) => (
                    <div
                      key={q.key}
                      className="rounded-3xl border border-ash-peach/70 bg-white p-4 transition hover:border-ash-coral/60 hover:shadow-[0_10px_24px_-14px_rgba(238,106,80,0.6)]"
                    >
                      <dt className="font-display text-sm font-bold text-ash-coral">{q.label}</dt>
                      <dd className="mt-1 text-[15px] leading-relaxed text-ash-ink/85 sm:text-sm">{stage.answers[q.key]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <div className="flex gap-3 border-t border-ash-peach/60 px-4 py-4 sm:px-10">
            <button
              onClick={() => stepAndReveal(-1)}
              disabled={index === 0}
              className="min-h-12 min-w-0 flex-1 truncate rounded-full border-2 border-ash-teal/20 px-4 font-display text-sm font-bold text-ash-teal transition hover:border-ash-teal disabled:opacity-35 sm:flex-none sm:px-6"
            >
              ← <span className="sm:hidden">Prev</span>
              <span className="hidden sm:inline">{index > 0 ? JOURNEY[index - 1].name : "Start"}</span>
            </button>
            <button
              onClick={() => stepAndReveal(1)}
              disabled={index === JOURNEY.length - 1}
              className="min-h-12 min-w-0 flex-1 truncate rounded-full bg-ash-coral px-4 font-display text-sm font-bold text-white transition hover:bg-[#e25a40] disabled:opacity-35 sm:ml-auto sm:flex-none sm:px-6"
            >
              <span className="sm:hidden">Next</span>
              <span className="hidden sm:inline">{index < JOURNEY.length - 1 ? JOURNEY[index + 1].name : "The end"}</span> →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
