// Shared types for everything in src/content/.
//
// `todo` fields are notes for the team. They are never shown on the website.

export type DocumentCategory =
  "weekly-report" | "design-document" | "poster" | "presentation" | "video";

/** Every category except video. Videos have their own rules (see below). */
export type FileCategory = Exclude<DocumentCategory, "video">;

interface DocumentBase {
  /** Short unique id, e.g. "report-1". */
  id: string;
  /** Shown on the page. The format is added automatically, e.g. "(PDF)". */
  title: string;
  /** Optional one-line description shown under the title. */
  description?: string;
  /** Optional publication date in YYYY-MM-DD format, e.g. "2026-10-05". */
  date?: string;
  todo?: string;
}

export interface PublishedDocument extends DocumentBase {
  category: FileCategory;
  status: "published";
  /** File name inside public/docs/, e.g. "weekly-report-1.pdf". */
  file: string;
}

export interface PlannedDocument extends DocumentBase {
  category: FileCategory;
  status: "planned";
  file?: never;
}

/**
 * A video transcript: either a file in public/docs/ (e.g. "demo-video-transcript.pdf"),
 * or the transcript text itself.
 */
export type Transcript = { file: string; text?: never } | { text: string; file?: never };

/**
 * A published video must be hosted elsewhere (never commit video files), must have captions,
 * and must have a transcript. TypeScript refuses a published video without all three.
 */
export interface PublishedVideo extends DocumentBase {
  category: "video";
  status: "published";
  /** Full link to the hosted video, e.g. on YouTube. Not a file in this repository. */
  url: string;
  /** Confirms the hosted video has accurate captions. Must be `true` to publish. */
  captions: true;
  transcript: Transcript;
  file?: never;
}

export interface PlannedVideo extends DocumentBase {
  category: "video";
  status: "planned";
  url?: never;
  file?: never;
}

export type ProjectDocument = PublishedDocument | PlannedDocument | PublishedVideo | PlannedVideo;

/** Id of a processed photo in src/assets/team/manifest.json (see scripts/optimize-images.mjs). */
export type PhotoId = string;

interface PersonBase {
  id: string;
  name: string;
  /** Leave out when there is no photo; an initials avatar is shown instead. */
  photo?: PhotoId;
  linkedin?: string;
  github?: string;
  todo?: string;
}

export interface Guide extends PersonBase {
  designation: string;
  organisation: string;
}

export interface Member extends PersonBase {
  usn: string;
  role: string;
  department: string;
}

export interface NavItem {
  label: string;
  /** Id of the section to jump to, without "#". */
  target: string;
}

export interface Paragraphs {
  heading: string;
  paragraphs: string[];
}

export interface TitledText {
  title: string;
  text: string;
}

export interface Component {
  name: string;
  purpose: string;
  /** Specific model or part name. Hidden until filled in. */
  part?: string;
  todo?: string;
}

export interface ExternalLink {
  label: string;
  href: string;
  description?: string;
}
