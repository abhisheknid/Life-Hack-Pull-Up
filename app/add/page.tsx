"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/types";

const emptyForm = {
  name: "",
  url: "",
  category: "",
  purpose: "",
  context: "",
  tags: "",
};

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
    <div className="max-w-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Add a Hack or Tool</h1>
        <p className="mt-1 text-sm text-ink/60 dark:text-white/60">
          Found something useful? Add it so future-you can find it again.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Name *</label>
          <input
            required
            value={form.name}
            onChange={update("name")}
            placeholder="e.g. Toggl Track"
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 outline-none ring-accent/30 focus:ring-2 dark:border-white/10 dark:bg-white/5"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Link</label>
          <input
            value={form.url}
            onChange={update("url")}
            placeholder="toggl.com/track"
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 outline-none ring-accent/30 focus:ring-2 dark:border-white/10 dark:bg-white/5"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Category *</label>
          {customCategory ? (
            <input
              required
              value={form.category}
              onChange={update("category")}
              placeholder="Type a new category"
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 outline-none ring-accent/30 focus:ring-2 dark:border-white/10 dark:bg-white/5"
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
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 outline-none ring-accent/30 focus:ring-2 dark:border-white/10 dark:bg-white/5"
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
              className="mt-1 text-xs text-accent hover:underline"
            >
              Choose from existing categories instead
            </button>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Purpose *</label>
          <textarea
            required
            value={form.purpose}
            onChange={update("purpose")}
            placeholder="What does it do, in one sentence?"
            rows={2}
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 outline-none ring-accent/30 focus:ring-2 dark:border-white/10 dark:bg-white/5"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Use it when…</label>
          <textarea
            value={form.context}
            onChange={update("context")}
            placeholder="The situation or need that should make you think of this"
            rows={2}
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 outline-none ring-accent/30 focus:ring-2 dark:border-white/10 dark:bg-white/5"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Keywords</label>
          <input
            value={form.tags}
            onChange={update("tags")}
            placeholder="comma, separated, keywords"
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 outline-none ring-accent/30 focus:ring-2 dark:border-white/10 dark:bg-white/5"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && (
          <p className="text-sm text-emerald-600">
            Added!{" "}
            <button
              type="button"
              onClick={() => router.push("/tools")}
              className="underline"
            >
              View all tools
            </button>
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-accent px-4 py-2.5 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Adding…" : "Add it"}
        </button>
      </form>
    </div>
  );
}
