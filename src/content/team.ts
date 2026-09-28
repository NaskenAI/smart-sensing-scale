// Project guides and team members. Member names, USNs, roles and departments are as in the
// legacy site's index.html.
//
// photo:    id of a processed photo (see scripts/optimize-images.mjs). Leave it out and an
//           initials avatar is shown instead.
// linkedin, github:  optional full URLs. Shown only when filled in.

import type { Guide, Member } from "./types";

export const guides: Guide[] = [
  {
    id: "k-v-suresh",
    name: "Dr. K V Suresh",
    designation: "Professor",
    organisation: "Department of ECE, SIT",
    photo: "k-v-suresh",
  },
  {
    id: "sandesh-g-v",
    name: "Sandesh G V",
    designation: "Founder / Software Developer",
    organisation: "Nasken Health, Boston, United States",
    photo: "sandesh-g-v",
    todo: "TODO: higher-resolution photo (the current one is only 200 × 200 px).",
  },
];

const department = "Electronics & Communication Engineering";

export const members: Member[] = [
  {
    id: "sanjeev-sivakumar",
    name: "Sanjeev Sivakumar",
    usn: "1SI24EC095",
    role: "Project Member",
    department,
    photo: "sanjeev-sivakumar",
    todo: "TODO: larger photo (the original is only 335 × 443 px).",
  },
  {
    id: "vikas-g-p",
    name: "Vikas G P",
    usn: "1SI24EC117",
    role: "Project Member",
    department,
    photo: "vikas-g-p",
  },
  {
    id: "logeshwar-p",
    name: "Logeshwar P",
    usn: "1SI24EC125",
    role: "Project Member",
    department,
    photo: "logeshwar-p",
  },
  {
    id: "suhas-s",
    name: "Suhas S",
    // As written in the legacy site. Do not change the year.
    usn: "1SI25EC410",
    role: "Project Member",
    department,
    photo: "suhas-s",
  },
];

export const teamText = {
  heading: "Team",
  guidesHeading: "Project guides",
  guideRole: "Project Guide",
  membersHeading: "Team members",
  usnLabel: "USN",
  photoAlt: (name: string) => `Photo of ${name}`,
  linkedinLabel: (name: string) => `${name} on LinkedIn`,
  githubLabel: (name: string) => `${name} on GitHub`,
};
