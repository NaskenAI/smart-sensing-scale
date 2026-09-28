// Turns the original team photos into small WebP files for the website.
//
// Usage:  npm run images
//
// Reads originals from  photos/originals/  (committed, so the script can be re-run)
// Writes WebP files to  src/assets/team/   plus  src/assets/team/manifest.json
//
// Every photo is cropped to the same portrait shape (4:5) and saved at 400 px and 800 px
// wide. A photo that is smaller than that is never enlarged: it is saved at its own width.
//
// To add or replace a photo: put the original in photos/originals/, add or edit its entry
// in PHOTOS below, run `npm run images`, then set `photo` for that person in
// src/content/team.ts to the same id.

import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const inputDir = path.join(root, "photos", "originals");
const outputDir = path.join(root, "src", "assets", "team");

/** Portrait aspect ratio used for everyone: width / height. */
const ASPECT = 4 / 5;
const WIDTHS = [400, 800];

/**
 * id:    the name used in src/content/team.ts (`photo: "<id>"`) and in the output file names.
 * file:  the original file in photos/originals/.
 * crop:  optional. The part of the original to keep, in pixels. Leave it out to crop the
 *        largest 4:5 area from the centre. When you set it, keep width / height = 4 / 5.
 */
const PHOTOS = [
  // Guides: same originals and crops as the other SIT project site.
  { id: "k-v-suresh", file: "k-v-suresh.jpg" },
  // 200 × 200 original: kept at native size (TODO: higher-resolution photo).
  { id: "sandesh-g-v", file: "sandesh-g-v.jpg" },
  // 335 × 443 scan with a 2 px black border: crop inside it, kept at native size
  // (TODO: larger photo).
  {
    id: "sanjeev-sivakumar",
    file: "sanjeev-sivakumar.jpg",
    crop: { left: 6, top: 12, width: 320, height: 400 },
  },
  // White band along the bottom: crop above it, centred on the face.
  { id: "vikas-g-p", file: "vikas-g-p.jpg", crop: { left: 15, top: 0, width: 700, height: 875 } },
  // Phone photo of a printed passport photo: crop well inside the printed border so the
  // paper edge and the surface around it are not visible.
  {
    id: "logeshwar-p",
    file: "logeshwar-p.jpg",
    crop: { left: 125, top: 130, width: 880, height: 1100 },
  },
  // Scan edges on the left, right and top: crop inside them.
  { id: "suhas-s", file: "suhas-s.jpg", crop: { left: 34, top: 14, width: 456, height: 570 } },
];

function centreCrop(width, height) {
  if (width / height > ASPECT) {
    const w = Math.round(height * ASPECT);
    return { left: Math.round((width - w) / 2), top: 0, width: w, height };
  }
  const h = Math.round(width / ASPECT);
  return { left: 0, top: Math.round((height - h) / 2), width, height: h };
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  for (const name of await readdir(outputDir)) {
    if (name.endsWith(".webp")) await rm(path.join(outputDir, name));
  }

  const manifest = {};
  for (const photo of PHOTOS) {
    const input = path.join(inputDir, photo.file);
    const meta = await sharp(input).metadata();
    const crop = photo.crop ?? centreCrop(meta.width, meta.height);

    if (crop.left + crop.width > meta.width || crop.top + crop.height > meta.height) {
      throw new Error(`${photo.id}: crop is outside the ${meta.width}×${meta.height} image`);
    }
    if (Math.abs(crop.width / crop.height - ASPECT) > 0.01) {
      throw new Error(`${photo.id}: crop must be 4:5 (got ${crop.width}×${crop.height})`);
    }

    // Never upscale: drop sizes wider than the cropped original.
    let widths = WIDTHS.filter((w) => w <= crop.width);
    if (widths.length === 0) widths = [crop.width];

    const sources = [];
    for (const width of widths) {
      const height = Math.round(width / ASPECT);
      const fileName = `${photo.id}-${width}.webp`;
      await sharp(input)
        .rotate()
        .extract(crop)
        .resize(width, height)
        .webp({ quality: 80 })
        .toFile(path.join(outputDir, fileName));
      sources.push({ file: fileName, width, height });
    }
    manifest[photo.id] = sources;
    console.log(`${photo.id}: ${sources.map((s) => `${s.width}×${s.height}`).join(", ")}`);
  }

  await writeFile(path.join(outputDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
