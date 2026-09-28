// Compile-time checks for the document types. Nothing here runs or is bundled: `npm run
// typecheck` fails if any line marked @ts-expect-error stops being an error, i.e. if the
// types start allowing a video to be published without a URL, captions or a transcript.

import type { ProjectDocument } from "../content/types";

const base = { id: "demo", title: "Final Demo Video", category: "video" } as const;

export const typeChecks: ProjectDocument[] = [
  // Allowed: a planned video, and a fully specified published video.
  { ...base, status: "planned" },
  {
    ...base,
    status: "published",
    url: "https://example.org/video",
    captions: true,
    transcript: { file: "demo-video-transcript.pdf" },
  },

  // @ts-expect-error a published video needs a transcript
  { ...base, status: "published", url: "https://example.org/video", captions: true },
  // @ts-expect-error a published video needs captions
  { ...base, status: "published", url: "https://example.org/video", transcript: { text: "…" } },
  {
    ...base,
    status: "published",
    url: "https://example.org/video",
    // @ts-expect-error captions must be true, not false
    captions: false,
    transcript: { text: "…" },
  },
  // @ts-expect-error a published video needs a hosted URL
  { ...base, status: "published", captions: true, transcript: { text: "…" } },
  // @ts-expect-error a video cannot be published as a file in this repository
  { ...base, status: "published", file: "demo.mp4" },
];
