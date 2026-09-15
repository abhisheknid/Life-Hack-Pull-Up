export const CATEGORIES = [
  "Learning",
  "Productivity",
  "Creativity",
  "Security & Privacy",
  "Discovery & Fun",
  "Critical Thinking",
  "Research & OSINT",
  "Startup & Dev Tools",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Hack {
  id: number;
  name: string;
  url: string;
  category: string;
  purpose: string;
  context: string;
  tags: string[];
  pickTags: string[];
  createdAt: string;
}

export interface NewHackInput {
  name: string;
  url: string;
  category: string;
  purpose: string;
  context?: string;
  tags?: string[];
}
