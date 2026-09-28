// Every document on the site: weekly reports, design document, poster, presentation and
// demo video.
//
// To publish a PDF document:
//   1. Put the PDF in public/docs/, e.g. public/docs/weekly-report-1.pdf
//   2. Change its entry below from
//        status: "planned",
//      to
//        status: "published",
//        file: "weekly-report-1.pdf",
//        date: "2026-10-05",          // optional, YYYY-MM-DD
//   3. Commit and push. The site rebuilds itself.
//
// The demo video is different: see the comment on its entry.

import type { ProjectDocument } from "./types";

export const documents: ProjectDocument[] = [
  // Weekly reports (shown in the Progress timeline, in this order)
  {
    id: "weekly-report-1",
    category: "weekly-report",
    title: "Weekly Report 1",
    status: "planned",
  },
  {
    id: "weekly-report-2",
    category: "weekly-report",
    title: "Weekly Report 2",
    status: "planned",
  },

  // Design documents
  {
    id: "design-document",
    category: "design-document",
    title: "Design Document",
    status: "planned",
  },

  // Poster, presentation and demo video
  {
    id: "poster",
    category: "poster",
    title: "Final Project Poster",
    status: "planned",
  },
  {
    id: "final-presentation",
    category: "presentation",
    title: "Final Presentation",
    status: "planned",
  },
  // Never commit the video file. Upload it to a video site with accurate captions, then set:
  //   status: "published",
  //   url: "https://…",                                   // link to the hosted video
  //   captions: true,                                     // only once captions are checked
  //   transcript: { file: "demo-video-transcript.pdf" },  // or { text: "…" }
  {
    id: "demo-video",
    category: "video",
    title: "Final Demo Video",
    status: "planned",
    todo: "TODO: host the video with captions and add a transcript. It must show no person's real readings or foot images.",
  },
];

export const documentText = {
  progressHeading: "Progress",
  progressIntro: "Weekly reports for the 2026–27 academic year.",
  progressGroupHeading: "Fifth semester",
  designHeading: "Design documents",
  designIntro: "Project documentation.",
  posterHeading: "Poster, presentation and demo video",
  posterIntro: "The final poster, the final presentation and a demonstration video.",
  published: "Published",
  planned: "Not yet published",
  publishedOn: "Published",
  /** Added to the link text of each document, by file extension. */
  formats: { pdf: "PDF", pptx: "PowerPoint", docx: "Word" } as Record<string, string>,
  /** Added to the link text of a published video. */
  videoFormat: "video with captions",
  transcriptLabel: "Transcript",
};
