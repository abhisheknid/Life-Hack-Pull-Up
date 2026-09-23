import type { Metadata } from "next";
import JourneyMap from "@/components/JourneyMap";
import { Spark } from "@/components/Doodles";
import { INSTAGRAM_ACCOUNTS } from "@/data/ashikaJourney";

export const metadata: Metadata = {
  title: "Brand journey for Ashika Mehta",
  description: "Instagram account structure and the 11-stage user journey, from discovery to evangelism.",
};

export default function AshikaMehtaPage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-lavender-soft to-lavender px-6 py-10 sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/30 sm:h-60 sm:w-60" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-widest text-ink/60">One-pager</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight text-ink sm:text-5xl">
            Brand journey for Ashika Mehta
            <Spark className="ml-1 inline h-6 w-6 align-top text-accent sm:h-8 sm:w-8" />
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-ink/70 sm:text-base">
            How someone goes from first seeing Ashika on Instagram to buying the course, finishing it, and
            recommending her to others. Hover over any stage to see the answers to the 11 questions that
            define it.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold">Instagram structure</h2>
        <p className="mt-1 text-sm text-ink/60 dark:text-white/60">
          One main account and two cohort accounts, each for a different audience.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {INSTAGRAM_ACCOUNTS.map((acc) => (
            <div
              key={acc.code}
              className={`rounded-4xl p-6 ${
                acc.locked
                  ? "bg-ink text-white sm:order-2 dark:bg-white dark:text-ink"
                  : `border border-black/5 bg-white dark:border-white/10 dark:bg-[#1b1a20] ${
                      acc.code === "IG2" ? "sm:order-1" : "sm:order-3"
                    }`
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">{acc.code}</span>
                {acc.locked && (
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold text-white">
                    Locked in
                  </span>
                )}
              </div>
              <h3 className="mt-2 font-display text-xl font-bold">{acc.title}</h3>
              <p className="text-sm opacity-70">{acc.cohort}</p>
              <p className="mt-4 font-display text-lg font-semibold text-accent">{acc.handle}</p>
              <p className="mt-1 text-xs opacity-60">{acc.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold">User journey</h2>
        <p className="mb-5 mt-1 text-sm text-ink/60 dark:text-white/60">
          11 stages, from discovery to evangelism and referral.
        </p>
        <JourneyMap />
      </section>
    </div>
  );
}
