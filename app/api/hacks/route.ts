import { NextRequest, NextResponse } from "next/server";
import { addHack, listHacks } from "@/lib/db";
import type { NewHackInput } from "@/lib/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  const category = (searchParams.get("category") ?? "").trim();

  let hacks = listHacks();

  if (category && category !== "All") {
    hacks = hacks.filter((h) => h.category === category);
  }

  if (q) {
    hacks = hacks.filter((h) => {
      const haystack = [h.name, h.purpose, h.context, h.category, ...h.tags, ...h.pickTags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  return NextResponse.json({ hacks });
}

export async function POST(req: NextRequest) {
  let body: Partial<NewHackInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = (body.name ?? "").toString().trim();
  const url = (body.url ?? "").toString().trim();
  const category = (body.category ?? "").toString().trim();
  const purpose = (body.purpose ?? "").toString().trim();
  const context = (body.context ?? "").toString().trim();
  const tags = Array.isArray(body.tags)
    ? body.tags.map((t) => String(t).trim()).filter(Boolean)
    : [];

  if (!name || !category || !purpose) {
    return NextResponse.json(
      { error: "Name, category, and purpose are required." },
      { status: 400 }
    );
  }

  if (url) {
    try {
      // Allow bare domains like "example.com" by prefixing https:// when no scheme given.
      new URL(url.match(/^https?:\/\//i) ? url : `https://${url}`);
    } catch {
      return NextResponse.json({ error: "That URL doesn't look valid." }, { status: 400 });
    }
  }

  const normalizedUrl = url ? (url.match(/^https?:\/\//i) ? url : `https://${url}`) : "";

  const hack = addHack({ name, url: normalizedUrl, category, purpose, context, tags });
  return NextResponse.json({ hack }, { status: 201 });
}
