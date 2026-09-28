# Smart Sensing Scale for Comprehensive Diabetic Foot Monitoring

Project website for a Mini Project in the Department of Electronics and Communication
Engineering, Siddaganga Institute of Technology, Tumakuru (Team 2026–27).

**Live site:** https://naskenai.github.io/smart-sensing-scale/

The scale is designed to map plantar pressure with a force-sensitive resistor (FSR) array and
foot temperature with an MLX90640 infrared thermal array, score risk on a Raspberry Pi board,
and send readings over Wi-Fi to a server and web dashboard. This repository holds only the
**website**. The team's own software will live in a separate repository.

Accessibility is the main quality bar for this site. Every change is checked automatically
(see [Checks](#checks)). The site shares its design, components and checks with the other SIT
project website in the NaskenAI organisation, so both look and behave like one family.

## This is not a medical device: rules for the website text

The subject is diabetic foot health, so the site must never read as a medical product or a
clinical claim. When you edit any text:

- Keep the status line near the top of the page: it says the project is a student project in
  progress, not a medical device, not clinically tested, and not to be used for care decisions.
- Write capabilities as design goals ("is designed to", "aims to"). The strongest claim allowed
  is that the project "aims to support early identification of risk". Never say it diagnoses,
  treats, prevents or detects any condition.
- Do not state threshold values for pressure or temperature, even from published papers, until
  the team has chosen them and recorded the source. Never describe them as clinically
  validated.
- Never publish anyone's real readings, foot images or case details, and do not add example
  heatmaps or charts.
- Do not add diabetes or DFU statistics.

## What it is built with

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript (strict mode)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Atkinson Hyperlegible](https://fontsource.org/fonts/atkinson-hyperlegible), self-hosted
- Hosted on GitHub Pages. No backend, analytics, cookies or trackers.

You do **not** need to know React to update the site. Almost everything you will change is
in `src/content/`.

## Run it on your computer

You need [Node.js](https://nodejs.org/) 24 (the version is in `.nvmrc`) and Git.

```sh
git clone https://github.com/NaskenAI/smart-sensing-scale.git
cd smart-sensing-scale
npm ci          # install exactly the versions in package-lock.json
npm run dev     # start a local copy of the site
```

Open the address it prints (usually http://localhost:5173/smart-sensing-scale/). The page
reloads automatically when you save a file.

## Where things are

| What                                     | Where                      |
| ---------------------------------------- | -------------------------- |
| All text on the page                     | `src/content/*.ts`         |
| Weekly reports, documents, demo video    | `src/content/documents.ts` |
| PDF files                                | `public/docs/`             |
| Guides and team members                  | `src/content/team.ts`      |
| Original team photos                     | `photos/originals/`        |
| Processed photos (generated, don't edit) | `src/assets/team/`         |
| Page layout and components               | `src/components/`          |
| Colours                                  | `src/index.css`            |

## Common tasks

### Publish a weekly report

1. Export the report as a PDF. Please use your word processor's "tagged PDF" or
   "accessible PDF" option if it has one.
2. Give it a short name with no spaces, e.g. `weekly-report-1.pdf`, and put it in
   `public/docs/`.
3. Open `src/content/documents.ts` and find the report's entry:

   ```ts
   {
     id: "weekly-report-1",
     category: "weekly-report",
     title: "Weekly Report 1",
     status: "planned",
   },
   ```

4. Change `status` to `"published"` and add the file name (and, if you like, the date):

   ```ts
   {
     id: "weekly-report-1",
     category: "weekly-report",
     title: "Weekly Report 1",
     status: "published",
     file: "weekly-report-1.pdf",
     date: "2026-10-05",
   },
   ```

5. Run `npm run dev` and check that the link works. The site adds "(PDF)" to the link text
   for you.
6. Commit both files and push (or open a pull request). The live site updates within a few
   minutes.

If you mark a document `published` but forget the PDF, the checks fail and tell you which
file is missing. New weekly reports go in the same list; copy an entry and give it a new `id`
and title.

### Publish the design document, poster or presentation

The same steps as a weekly report. They live in the same file, `src/content/documents.ts`,
under the "Design documents" and "Poster, presentation and demo video" comments. To add a new
one, copy an existing entry, give it a new unique `id`, and set `category` to one of
`"design-document"`, `"poster"` or `"presentation"`.

### Publish the demo video

**Never commit a video file to this repository.**

1. Upload the video to a video site (for example YouTube or Google Drive) that supports
   captions.
2. Add accurate captions there. Automatic captions are a starting point only: check them and
   correct them.
3. Write a transcript: everything that is said, plus a short description of what is shown.
   Save it as a PDF in `public/docs/` (e.g. `demo-video-transcript.pdf`), or paste it as text.
4. Make sure the video shows no person's real readings, foot images or case details.
5. In `src/content/documents.ts`, change the video entry to:

   ```ts
   {
     id: "demo-video",
     category: "video",
     title: "Final Demo Video",
     status: "published",
     url: "https://…",                                  // link to the hosted video
     captions: true,                                    // only once captions are checked
     transcript: { file: "demo-video-transcript.pdf" }, // or { text: "…" }
   },
   ```

The site will not build if a published video is missing its `url`, `captions: true` or its
`transcript`. The page links to the video; it does not embed a player.

### Update a team member's details

Edit `src/content/team.ts`. Each person has a name, USN, role and department. Two fields are
optional and are only shown when filled in:

```ts
linkedin: "https://www.linkedin.com/in/your-profile/",
github: "https://github.com/your-username",
```

### Add or replace a photo

1. Put the original photo (JPEG or PNG) in `photos/originals/`, named after the person's id,
   e.g. `sanjeev-sivakumar.jpg` (lowercase extension). Please use a photo at least 400 px wide,
   ideally 800 px or more, and without scan borders.
2. Open `scripts/optimize-images.mjs` and add or edit the person's line in `PHOTOS`:

   ```js
   { id: "sanjeev-sivakumar", file: "sanjeev-sivakumar.jpg" },
   ```

   Without `crop`, the script cuts the largest 4:5 portrait from the centre. If the face ends
   up off-centre, or a border shows, add a `crop` with pixel values that stays inside any
   border (it must stay 4:5, e.g. 640 × 800).

3. Run:

   ```sh
   npm run images
   ```

   This writes WebP files at 400 px and 800 px wide into `src/assets/team/`. It never
   enlarges a small photo.

4. In `src/content/team.ts`, set the person's `photo` to the same id:
   `photo: "sanjeev-sivakumar",`
5. Run `npm run dev`, look at the photo, then commit `photos/originals/`, `src/assets/team/`,
   the script and `team.ts`.

Anyone without a `photo` is shown with their initials instead.

## Checks

Run these before you push. CI runs all of them on every push and pull request.

```sh
npm run typecheck        # TypeScript errors
npm run lint             # code and accessibility lint rules
npm run format:check     # formatting (fix it with: npm run format)
npm run check:contrast   # colour contrast for every colour pairing, both themes
npm run build            # build the site into dist/
npm run check:size       # first-load JavaScript must stay under 120 KB (gzipped)
npm run check:leftovers  # no text left over from the other SIT project site
npm run check:html       # no placeholder links (#, empty, bare github.com), every image has alt text
npm run test:e2e         # axe accessibility, keyboard, zoom/reflow tests
```

The browser tests need Playwright's browser once: `npx playwright install chromium`. If that
download fails on your network, run the tests in your installed Google Chrome instead:
`PW_CHANNEL=chrome npm run test:e2e` (and the same for `check:html`).

`npm run screenshots` saves full-page screenshots at 375 px and 1280 px, in both themes,
to `screenshots/` for you to look over.

**Do not switch off a lint rule or weaken a test to get a pass.** Fix the page instead. If
you're stuck, ask a guide.

## How deployment works

- `.github/workflows/ci.yml` runs every check above on every push and pull request.
- `.github/workflows/deploy.yml` runs on every push to `main`. It builds the site and
  publishes `dist/` to GitHub Pages.

### Reading a failed run

1. On GitHub, open the **Actions** tab, or click the red ✗ next to your commit.
2. Open the failed run and click the job name (**checks** or **build**).
3. Find the first step with a red ✗ and expand it. The error is usually in the last
   20 lines.
4. What the step names mean:
   - **Type check**: a TypeScript error, often a typo in `src/content/`, e.g. a missing
     comma or quote, or a field with the wrong name. A published video without its `url`,
     `captions: true` or `transcript` fails here.
   - **Lint**: a code or accessibility rule, e.g. an image without `alt`.
   - **Formatting**: run `npm run format` and commit the result.
   - **Leftover text**: a word from the other SIT project site was found. The message gives
     the file and line.
   - **Links and image alt text**: a link to `#` or a missing PDF. The message names it.
   - **Accessibility (axe) and keyboard tests**: download the `playwright-report` file at the
     bottom of the run page, unzip it, and open `index.html` to see exactly what failed.
5. Fix it on your computer, run the same command locally until it passes, and push again.

## Corrections made to the legacy site

This site replaces an earlier static HTML/CSS/JS version. Its content was carried over with
these corrections:

1. "Diabetic foot complication remain" → "Diabetic foot complications remain".
2. "Rasberry Pi microcontroller" → "Raspberry Pi board (exact model unknown)". Most Raspberry
   Pi boards are single-board computers, not microcontrollers; the exact model is a TODO.
3. "a software for collecting…" → "software for collecting…", and "thermal camera IR array
   (MLX90640)" → "an MLX90640 infrared thermal array".
4. "DFU" is now expanded at first use: "diabetic foot ulcers (DFU)".
5. The legacy page had two `<h1>` elements and jumped from `<h2>` to `<h4>`. There is now one
   `<h1>` and no skipped heading levels.
6. All six document links (Report 1, Report 2, poster, demo video, design document, final
   presentation) pointed to files that were not in the repository. All six are now listed as
   "Not yet published".
7. The "Git Organization" link pointed to https://github.com/ itself. The Source code section
   now links to the NaskenAI organisation and to this website's repository.
8. Academic year "2026–27" and project type "Mini Project" were added. "Fifth semester" stays
   as the heading over the weekly reports.
9. The weekly reports are titled "Weekly Report 1" and "Weekly Report 2".
10. The two guide entries match the other SIT project site.
11. Every USN is kept exactly as written, including 1SI25EC410 (Suhas S).

Wording was also changed so the site never reads as a medical claim: "enabling early detection
of potential risks of DFU" became "aims to support early identification of risk of diabetic
foot ulcers (DFU)", and "exceeding clinically significant limits" became "above set
thresholds".

## Open TODOs

Each of these is also recorded as a `todo` field in `src/content/` and is **not** shown on
the site.

**Documents:** all six (Weekly Reports 1 and 2, the design document, the poster, the final
presentation, and the demo video with captions and a transcript).

**Team:**

- Larger photo of Sanjeev Sivakumar (the original is 335 × 443 px).
- Higher-resolution photo of Sandesh G V (the current one is 200 × 200 px).
- LinkedIn and GitHub links for anyone who wants them shown.

**Hardware and software details** (`src/content/project.ts`):

- Exact Raspberry Pi model.
- FSR model and the number of sensors in the array.
- Where results are displayed (on the scale, a phone, or elsewhere) and the display part.
- Whether Wi-Fi is built into the board or a separate module.
- Server stack and hosting.
- Dashboard stack.
- Risk-scoring algorithm details.

**Thresholds:** the threshold values for peak pressure and for temperature differences, with
the published source for each. Do not put any values on the site until they are sourced.

**Other:**

- Test results (add a Results section once testing is done; no real readings of any person).
- Link to the team's own software repository (`src/content/links.ts`).
- Accessibility contact email (`src/content/accessibility.ts`). When it's added, remove the
  "no contact address" limitation.

## Open decisions

- **Licence:** no licence file has been added yet. Until one is chosen, the code is "all
  rights reserved" by default. The team and guides should pick one (for example MIT for the
  code and CC BY 4.0 for the documents).
