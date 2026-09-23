// Builds the standalone GitHub Pages copy of /ashika-mehta into docs/index.html.
// Run with: npm run build:journey
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const template = join(here, "template.html");
const { JOURNEY, QUESTION_GROUPS, INSTAGRAM_ACCOUNTS } = await import(join(root, "data", "ashikaJourney.ts"));

const tmp = mkdtempSync(join(tmpdir(), "journey-"));
const config = join(tmp, "tailwind.config.cjs");
writeFileSync(
  config,
  `const base = require(${JSON.stringify(join(root, "tailwind.config.ts"))}).default;
module.exports = { ...base, content: [${JSON.stringify(template)}] };`,
);
writeFileSync(join(tmp, "in.css"), "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n");
execFileSync(join(root, "node_modules", ".bin", "tailwindcss"), ["-c", config, "-i", join(tmp, "in.css"), "-o", join(tmp, "out.css"), "--minify"], { stdio: "inherit" });

const data = JSON.stringify({ J: JOURNEY, Q: QUESTION_GROUPS, IG: INSTAGRAM_ACCOUNTS }).replace(/</g, "\\u003c");
const body = readFileSync(template, "utf8")
  .replace("/*__CSS__*/", () => readFileSync(join(tmp, "out.css"), "utf8"))
  .replace("/*__DATA__*/", () => data);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Instagram account structure and the 11-stage user journey for Ashika Mehta, from discovery to evangelism.">
${body.slice(0, body.indexOf('<div class="min-h-screen'))}</head>
<body style="margin:0">
${body.slice(body.indexOf('<div class="min-h-screen'))}</body>
</html>
`;
writeFileSync(join(root, "docs", "index.html"), html);
console.log("Wrote docs/index.html");
