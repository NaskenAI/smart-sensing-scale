// Fails if text copied from the reference project (a different SIT project website) is left
// in this site. Matches whole words or phrases, ignoring case.
//
// Scans: src/, index.html, public/, README.md and the built dist/ (run `npm run build` first).
//
// Usage: npm run build && npm run check:leftovers

import { existsSync } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const TERMS = [
  "cane",
  "edge-vision",
  "visually impaired",
  "obstacle",
  "Raspberry Pi 5",
  "Abhishek",
  "Avinash",
  "Kartik",
  "Lakshisha",
  "1SI24EC002",
  "1SI24EC017",
  "1SI24EC053",
  "1SI24EC056",
];

const TARGETS = ["src", "index.html", "public", "README.md", "dist"];

// Binary files cannot contain readable leftovers; skip them.
const BINARY = new Set([
  ".webp",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".ico",
  ".woff",
  ".woff2",
  ".pdf",
]);

function pattern(term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
  // Whole word or phrase (plural "s" included): not preceded or followed by a letter, digit
  // or underscore. So "cane" and "canes" match, but "hurricane" does not.
  return new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}s?(?![\\p{L}\\p{N}_])`, "giu");
}
const patterns = TERMS.map((term) => ({ term, regex: pattern(term) }));

async function* files(target) {
  const info = await stat(target);
  if (info.isFile()) {
    yield target;
    return;
  }
  for (const entry of await readdir(target, { withFileTypes: true })) {
    yield* files(path.join(target, entry.name));
  }
}

const problems = [];
let scanned = 0;
for (const target of TARGETS) {
  const full = path.join(root, target);
  if (!existsSync(full)) {
    problems.push(
      `${target} does not exist${target === "dist" ? " (run npm run build first)" : ""}`,
    );
    continue;
  }
  for await (const file of files(full)) {
    if (BINARY.has(path.extname(file).toLowerCase())) continue;
    scanned++;
    const lines = (await readFile(file, "utf8")).split("\n");
    lines.forEach((line, index) => {
      for (const { term, regex } of patterns) {
        regex.lastIndex = 0;
        if (regex.test(line)) {
          problems.push(`${path.relative(root, file)}:${index + 1}  "${term}"`);
        }
      }
    });
  }
}

console.log(`Scanned ${scanned} files for ${TERMS.length} leftover terms.`);
if (problems.length) {
  console.error(`\n${problems.length} leftover(s) found:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log("No leftovers found.");
