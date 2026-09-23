"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/types";
import { Spark } from "@/components/Doodles";
import { PillButton } from "@/components/PillButton";

const emptyForm = {
  name: "",
  url: "",
  category: "",
  purpose: "",
  context: "",
  tags: "",
};

const inputClass =
  "w-full rounded-2xl border border-black/10 bg-cream/60 px-4 py-3 text-sm outline-none ring-accent/30 placeholder:text-ink/30 focus:ring-2 dark:border-white/10 dark:bg-white/5";

export default function AddPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([...CATEGORIES]);
  const [form, setForm] = useState(emptyForm);
  const [customCategory, setCustomCategory] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.categories) && data.categories.length) {
          setCategories(data.categories);
        }
      })
      .catch(() => {});
  }, []);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!form.name.trim() || !form.category.trim() || !form.purpose.trim()) {
      setError("Name, category, and purpose are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/hacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          url: form.url,
          category: form.category,
          purpose: form.purpose,
          context: form.context,
          tags: form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setSuccess(true);
      setForm(emptyForm);
      setCustomCategory(false);
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-peach-soft to-peach px-6 py-10 sm:px-12 sm:py-12">
        <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/25 sm:h-48 sm:w-48" />
        <div className="relative max-w-lg">
          <h1 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Add a Hack or Tool
            <Spark className="ml-1 inline h-5 w-5 align-top text-accent sm:h-6 sm:w-6" />
          </h1>
          <p className="mt-2 text-sm text-ink/70 sm:text-base">
            Found something useful? Add it so future-you can find it again.
          </p>
        </div>
      </section>

      <div className="mx-auto -mt-8 max-w-xl rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.07)] dark:border-white/10 dark:bg-[#1b1a20] sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Name *</label>
            <input
              required
              value={form.name}
              onChange={update("name")}
              placeholder="e.g. Toggl Track"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">Link</label>
            <input
              value={form.url}
              onChange={update("url")}
              placeholder="toggl.com/track"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">Category *</label>
            {customCategory ? (
              <input
                required
                value={form.category}
                onChange={update("category")}
                placeholder="Type a new category"
                className={inputClass}
              />
            ) : (
              <select
                required
                value={form.category}
                onChange={(e) => {
                  if (e.target.value === "__custom__") {
                    setCustomCategory(true);
                    setForm((f) => ({ ...f, category: "" }));
                  } else {
                    update("category")(e);
                  }
                }}
                className={inputClass}
              >
                <option value="" disabled>
                  Choose a category…
                </option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                <option value="__custom__">+ New category…</option>
              </select>
            )}
            {customCategory && (
              <button
                type="button"
                onClick={() => setCustomCategory(false)}
                className="mt-1.5 text-xs font-semibold text-accent hover:underline"
              >
                Choose from existing categories instead
              </button>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">Purpose *</label>
            <textarea
              required
              value={form.purpose}
              onChange={update("purpose")}
              placeholder="What does it do, in one sentence?"
              rows={2}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">Use it when…</label>
            <textarea
              value={form.context}
              onChange={update("context")}
              placeholder="The situation or need that should make you think of this"
              rows={2}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">Keywords</label>
            <input
              value={form.tags}
              onChange={update("tags")}
              placeholder="comma, separated, keywords"
              className={inputClass}
            />
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          {success && (
            <p className="text-sm font-medium text-emerald-600">
              Added!{" "}
              <button type="button" onClick={() => router.push("/tools")} className="underline">
                View all tools
              </button>
            </p>
          )}

          <div className="pt-2">
            <PillButton type="submit" variant="accent" disabled={submitting}>
              {submitting ? "Adding…" : "Add it"}
            </PillButton>
          </div>
        </form>
      </div>
    </div>
  );
}
