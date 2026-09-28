// Project identity and the descriptive sections of the page.
//
// Source: the legacy site's index.html, with the corrections listed in README.md.
// The project is in progress and is not a medical device, so capabilities are written as
// design goals, and nothing here may claim to diagnose, treat or prevent anything.

import type { Component, Paragraphs, TitledText } from "./types";

export const project = {
  siteTitle: "Smart Sensing Scale for Comprehensive Diabetic Foot Monitoring",
  projectType: "Mini Project",
  academicYear: "2026–27",
  teamLabel: "Team 2026–27",
  institution: "Siddaganga Institute of Technology",
  location: "Tumakuru",
  department: "Electronics and Communication Engineering",
};

export const hero = {
  eyebrow: `${project.projectType} · ${project.department} · ${project.academicYear}`,
  summary:
    "A scale-like platform designed to map pressure and temperature across the soles of the feet, which aims to support early identification of risk of diabetic foot ulcers (DFU).",
  status:
    "This is a student engineering project in progress. It is not a medical device, has not been clinically tested and must not be used to make decisions about anyone's care.",
  links: [
    { label: "How it works", target: "how-it-works" },
    { label: "Meet the team", target: "team" },
  ],
};

export const problem: Paragraphs & {
  proposalHeading: string;
  proposal: string[];
} = {
  heading: "The problem",
  paragraphs: [
    "Diabetic foot complications remain a leading cause of preventable hospitalization and lower extremity amputation, primarily due to the lack of early detection and monitoring of foot health.",
    "Hence, this project aims to develop a smart sensing scale that integrates pressure and temperature sensor arrays to monitor foot health in people with diabetes. The scale is designed to give real-time feedback on pressure distribution and temperature variations across different foot zones, and aims to support early identification of risk of diabetic foot ulcers (DFU).",
  ],
  proposalHeading: "The proposed system",
  proposal: [
    "The system integrates a force-sensitive resistor (FSR) array to map plantar pressure distribution and an MLX90640 infrared thermal array to detect zonal thermal asymmetry, all interfaced through a Raspberry Pi board (exact model unknown).",
    "Acquired data is designed to be processed on the device using a threshold-based risk-scoring algorithm that flags peak-pressure zones and temperature differences between zones above set thresholds, with results displayed immediately. Readings are also designed to be sent over Wi-Fi to a backend server, for historical trend analysis and remote viewing through a web dashboard.",
  ],
};

export const howItWorks = {
  heading: "How it works",
  intro: "The scale is designed to work in four stages.",
  stepsHeading: "The four stages",
  diagram: {
    title: "System diagram of the smart sensing scale",
    description:
      "Four stages connected by arrows, top to bottom. 1: FSR array and MLX90640 infrared thermal array, measuring pressure and temperature. 2: Raspberry Pi board, scoring risk on the device against set thresholds. 3: results displayed immediately. 4: readings sent over Wi-Fi to a backend server and web dashboard for trends and remote viewing. A note below the stages says this is a student project and not a medical device.",
    boxes: [
      { title: "FSR + thermal arrays", lines: ["Pressure and temperature", "across foot zones"] },
      { title: "Raspberry Pi board", lines: ["On-device, threshold-based", "risk scoring"] },
      { title: "Results display", lines: ["Shown immediately"] },
      { title: "Server + dashboard", lines: ["Sent over Wi-Fi: trends", "and remote viewing"] },
    ],
    note: ["Student project:", "not a medical device"],
  },
  steps: [
    {
      title: "Measure",
      text: "A force-sensitive resistor (FSR) array maps how pressure is spread across the sole of the foot, and an MLX90640 infrared thermal array measures temperature across foot zones.",
    },
    {
      title: "Score on the device",
      text: "A Raspberry Pi board is designed to process the readings on the device with a threshold-based risk-scoring algorithm. It flags peak-pressure zones, and temperature differences between zones, that are above set thresholds.",
    },
    {
      title: "Show the results",
      text: "The results are designed to be displayed immediately.",
    },
    {
      title: "Send and review",
      text: "Readings are designed to be sent over Wi-Fi to a backend server, so that trends over time can be reviewed remotely in a web dashboard.",
    },
  ] satisfies TitledText[],
};

export const objectives = {
  heading: "Objectives",
  items: [
    {
      title: "Sensing platform",
      text: "To design and fabricate a scale-like platform integrating pressure and temperature sensor arrays for foot monitoring.",
    },
    {
      title: "Data software",
      text: "To develop software for collecting, storing, analyzing, and visualizing the sensor data to identify pressure and temperature variations across different foot zones.",
    },
  ] satisfies TitledText[],
};

export type MeasureIcon = "pressure" | "temperature";

export const measures = {
  heading: "What it measures",
  intro: "The scale is designed to measure two things.",
  items: [
    {
      label: "Plantar pressure distribution",
      text: "How pressure is spread across the sole of the foot, measured by the FSR array.",
      icon: "pressure",
    },
    {
      label: "Temperature variation and asymmetry",
      text: "Temperature across foot zones, and the differences between zones, measured by the MLX90640 infrared thermal array.",
      icon: "temperature",
    },
  ] satisfies { label: string; text: string; icon: MeasureIcon }[],
};

export const components: {
  heading: string;
  intro: string;
  hardwareHeading: string;
  hardware: Component[];
  softwareHeading: string;
  software: Component[];
  partLabel: string;
} = {
  heading: "Hardware and software",
  intro: "The components named in the project abstract.",
  hardwareHeading: "Hardware",
  hardware: [
    {
      name: "FSR array",
      purpose: "Force-sensitive resistors that map plantar pressure distribution.",
      todo: "TODO: FSR model and the number of sensors in the array.",
    },
    {
      name: "Infrared thermal array",
      purpose: "Measures temperature across foot zones to detect zonal thermal asymmetry.",
      part: "MLX90640",
    },
    {
      name: "Raspberry Pi board",
      purpose: "Designed to read the sensors and run the risk-scoring algorithm on the device.",
      todo: "TODO: exact Raspberry Pi model (the legacy site did not say which board).",
    },
    {
      name: "Results display",
      purpose: "Designed to show the results immediately after a reading.",
      todo: "TODO: where results are displayed (on the scale, a phone, or elsewhere) and the display part.",
    },
    {
      name: "Wi-Fi",
      purpose: "Designed to send readings to the backend server.",
      todo: "TODO: whether Wi-Fi is built into the board or a separate module.",
    },
  ],
  softwareHeading: "Software",
  software: [
    {
      name: "Risk-scoring algorithm",
      purpose:
        "Threshold-based scoring on the device that flags peak-pressure zones and temperature differences between zones above set thresholds.",
      todo: "TODO: threshold values, the published source for each, and the algorithm details.",
    },
    {
      name: "Backend server",
      purpose:
        "Designed to receive readings over Wi-Fi and store them for historical trend analysis.",
      todo: "TODO: server stack and hosting.",
    },
    {
      name: "Web dashboard",
      purpose: "Designed for remote viewing of readings and trends over time.",
      todo: "TODO: dashboard stack.",
    },
  ],
  partLabel: "Part",
};

/** Project-level items that do not exist yet. Not shown on the page. */
export const projectTodos = [
  "TODO: threshold values for peak pressure and for temperature differences, with the published source for each. Do not state any values on the site until they are sourced.",
  "TODO: test results (add a Results section once testing is done; no real readings of any person).",
];
