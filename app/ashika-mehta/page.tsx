import type { Metadata, Viewport } from "next";
import JourneyMap from "@/components/JourneyMap";
import { INSTAGRAM_ACCOUNTS, JOURNEY } from "@/data/ashikaJourney";

export const metadata: Metadata = {
  title: "Brand journey for Ashika Mehta",
  description: "Instagram account structure and the 11-stage user journey, from discovery to evangelism.",
};

export const viewport: Viewport = {
  themeColor: "#ffd3b6",
};

const STATS = [
  { value: "3", label: "Instagram accounts" },
  { value: String(JOURNEY.length), label: "Journey stages" },
  { value: "11", label: "Questions per stage" },
];

export default function AshikaMehtaPage() {
  const main = INSTAGRAM_ACCOUNTS.find((a) => a.locked)!;
  const cohorts = INSTAGRAM_ACCOUNTS.filter((a) => !a.locked);

  return (
    <div className="min-h-screen overflow-x-clip bg-ash-cream text-ash-ink">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-ash-blush via-ash-peach to-ash-apricot">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/30 sm:h-[28rem] sm:w-[28rem]" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-ash-coral/20 sm:h-96 sm:w-96" />
        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-ash-teal px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ash-peach">
            <span className="h-1.5 w-1.5 rounded-full bg-ash-coral" />
            Brand one-pager
          </span>
          <h1 className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-ash-deep sm:text-7xl lg:text-8xl">
            Brand journey
            <br />
            for <span className="text-ash-coral">Ashika Mehta</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ash-ink/75 sm:text-lg">
            How someone goes from first seeing Ashika on Instagram to buying the course, finishing it, and
            recommending her to others.
          </p>

          <dl className="mt-8 grid max-w-xl grid-cols-3 gap-2 sm:gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-3xl bg-white/60 px-3 py-3 backdrop-blur sm:px-5 sm:py-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-extrabold text-ash-teal sm:text-4xl">{s.value}</dd>
                <p className="text-[11px] font-semibold leading-tight text-ash-ink/60 sm:text-xs">{s.label}</p>
              </div>
            ))}
          </dl>

          <a
            href="#journey"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ash-coral px-6 font-display text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(238,106,80,0.9)] transition hover:-translate-y-0.5 hover:bg-[#e25a40]"
          >
            Explore the journey
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      {/* Instagram structure */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-ash-coral">The ecosystem</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-ash-deep sm:text-5xl">Instagram structure</h2>
        <p className="mt-2 max-w-lg text-ash-ink/65">
          One main account and two cohort accounts, each for a different audience.
        </p>

        <div className="mt-8 flex flex-col items-center">
          <div className="w-full max-w-md rounded-[2rem] bg-ash-teal p-6 text-white shadow-[0_24px_50px_-24px_rgba(10,58,65,0.8)] sm:p-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-ash-mist/70">{main.code}</span>
              <span className="rounded-full bg-ash-coral px-3 py-1 text-[11px] font-bold">🔒 Locked in</span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-extrabold">{main.title}</h3>
            <p className="text-sm text-ash-mist/80">{main.cohort}</p>
            <p className="mt-5 break-all font-display text-2xl font-bold text-ash-peach sm:text-3xl">{main.handle}</p>
          </div>

          {/* connector */}
          <svg viewBox="0 0 400 56" className="hidden h-14 w-full max-w-2xl text-ash-teal/40 sm:block" aria-hidden="true">
            <path d="M200 0v20M200 20H70v36M200 20h130v36" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 6" />
          </svg>
          <div className="h-6 w-px border-l-2 border-dashed border-ash-teal/40 sm:hidden" aria-hidden="true" />

          <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
            {cohorts.map((acc) => (
              <div key={acc.code} className="rounded-[2rem] border-2 border-ash-peach bg-white p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-ash-ink/40">{acc.code}</span>
                  <span className="rounded-full bg-ash-blush px-3 py-1 text-[11px] font-bold text-ash-coral">
                    {acc.cohort}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-extrabold text-ash-deep">{acc.title}</h3>
                <p className="mt-4 font-display text-xl font-bold text-ash-coral">{acc.handle}</p>
                <p className="mt-1 text-sm text-ash-ink/55">{acc.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="scroll-mt-4 bg-ash-teal pb-10 pt-14 text-white sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-ash-apricot">User journey</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-5xl">
            From first scroll to <span className="text-ash-peach">lifelong fan</span>
          </h2>
          <p className="mt-2 max-w-xl text-ash-mist/80">
            <span className="hidden md:inline">Hover over any stage</span>
            <span className="md:hidden">Tap a stage or swipe the card</span> to see the answers to the 11
            questions that define it.
          </p>
        </div>
        <JourneyMap />
      </section>

      <footer className="px-5 py-8 text-center text-xs text-ash-ink/45">
        Draft answers, to be refined with the team.
      </footer>
    </div>
  );
}
