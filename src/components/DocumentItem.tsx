import { CircleCheck, Clock } from "lucide-react";
import { documentText } from "../content/documents";
import type { ProjectDocument, PublishedVideo } from "../content/types";
import { documentHref, formatDate, formatLabel } from "../lib/documents";

export function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-base ${
        published ? "border-accent text-accent" : "border-control text-muted"
      }`}
    >
      {published ? (
        <CircleCheck aria-hidden="true" className="size-4" />
      ) : (
        <Clock aria-hidden="true" className="size-4" />
      )}
      {published ? documentText.published : documentText.planned}
    </span>
  );
}

function Transcript({ doc }: { doc: PublishedVideo }) {
  const { transcript } = doc;
  if (transcript.file) {
    return (
      <p>
        <a href={documentHref(transcript.file)}>
          {doc.title}: {documentText.transcriptLabel.toLowerCase()} ({formatLabel(transcript.file)})
        </a>
      </p>
    );
  }
  return (
    <details className="max-w-[70ch]">
      <summary className="inline-flex min-h-11 cursor-pointer items-center font-bold">
        {documentText.transcriptLabel}
      </summary>
      <p className="mt-2 whitespace-pre-line">{transcript.text}</p>
    </details>
  );
}

/** Title (linked when published), status, optional date and description. */
export function DocumentBody({ doc }: { doc: ProjectDocument }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {doc.status === "planned" ? (
          <span className="font-bold">{doc.title}</span>
        ) : doc.category === "video" ? (
          <a href={doc.url} className="font-bold">
            {doc.title} ({documentText.videoFormat})
          </a>
        ) : (
          <a href={documentHref(doc.file)} className="font-bold">
            {doc.title} ({formatLabel(doc.file)})
          </a>
        )}
        <StatusBadge published={doc.status === "published"} />
      </div>
      {doc.date ? (
        <p className="text-base text-muted">
          {documentText.publishedOn} <time dateTime={doc.date}>{formatDate(doc.date)}</time>
        </p>
      ) : null}
      {doc.description ? <p className="max-w-[70ch] text-muted">{doc.description}</p> : null}
      {doc.status === "published" && doc.category === "video" ? <Transcript doc={doc} /> : null}
    </div>
  );
}

export function DocumentList({ items }: { items: ProjectDocument[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((doc) => (
        <li key={doc.id} className="rounded border border-line bg-canvas p-5">
          <DocumentBody doc={doc} />
        </li>
      ))}
    </ul>
  );
}
