import { NextResponse } from "next/server";
import { CATEGORIES } from "@/lib/types";
import { listCategories } from "@/lib/db";

export async function GET() {
  const dbCategories = await listCategories();
  const merged = Array.from(new Set([...CATEGORIES, ...dbCategories]));
  return NextResponse.json({ categories: merged });
}
